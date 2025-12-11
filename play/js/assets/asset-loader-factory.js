import { preloadAssets } from "./asset-preload";

export const LOADER_TYPE = Object.freeze({
    SINGLE: "single",
    GROUP: "group",
    BUNDLE: "bundle"
});

const levels = ['earth', 'moon', 'mars', 'jupiter', 'titan'];

function getBundlePath(str) {
    return `./${str}.js`;
}

// TODO: rewrite to typescript?
const LOADER_ERRORS = Object.freeze({
    TYPE: "Unexpected type.",
    COUNT: 'Unexpected count.'
});
function throwErr(name, reason, recieved, expected) {
    throw new Error(`(${name}) ${reason} Recieved: "${recieved}". Expected: "${expected}"`);
    // const err = {
    //     loaderName: name,
    //     error: reason,
    //     received: received,
    //     expected: expected
    // };
}

/**
 * Remove the surrounding ./*.js arround the keys
 * @param {*} bundle 
 * @returns 
 */
function unwrapLevelGroup(bundle) {
    let unwrapped = {};
    Object.entries(bundle).forEach(([key, value]) => {
        let strippedKey = key.substring(0, key.length - 3).substring(2);
        unwrapped[strippedKey] = value.default;
    });
    return unwrapped;
}

export function createAssetLoader(assets, options) {
    switch (options.type) {
        case LOADER_TYPE.SINGLE: {
            if (typeof assets !== "string") {
                throw new Error(`(${options.name}) Unexpected asset type. Got ${typeof assets}, but expected "string"`);
            }

            return {
                async preload() {
                    await preloadAssets(assets);
                    return assets;
                },

                get() {
                    return assets;
                }
            }
        }

        case LOADER_TYPE.BUNDLE: {
            if (typeof assets !== "object") {
                throw new Error(`(${options.name}) Unexpected asset type. Got ${typeof assets}, but expected "object"`);
            }

            if (Object.keys(assets).length !== 1) {
                throw new Error(`(${options.name}) Unexpected module count.`
                    + ` Expected one, recieved ${Object.keys(assets).length} module(s).`
                    + ` Modules recieved: ${Object.keys(assets).join(", ")}`);
            }

            const bundle = assets[Object.keys(assets)[0]].default;

            return {
                async preload() {
                    await preloadAssets(bundle);
                    return bundle;
                },

                get() {
                    return bundle;
                }
            }
        }

        case LOADER_TYPE.GROUP: {
            if (typeof assets !== "object") {
                throw new Error(`(${options.name}) Unexpected asset type. Got ${typeof assets}, but expected "object"`);
            }

            if (Object.keys(assets).length !== levels.length) {
                throw new Error(`(${options.name}) Unexpected module count. Got ${Object.keys(assets).length}, expected ${levels.length}`)
            }

            const missing = [];
            levels.forEach((level) => {
                if (!assets[getBundlePath(level)]) {
                    missing.push(getBundlePath(level));
                }
            });
            if (missing.length > 0) {
                throw new Error(`(${options.name})Expected module(s) not found in modules. Missing: "${missing.join(', ')}". Recieved: "${Object.keys(assets).join(', ')}"`);
            }

            const unwrapped = unwrapLevelGroup(assets);

            return {
                /**
                 * Get all sprites belonging to a specific level, as well as making sure all sprites are pre-loaded
                 * This is an asynchronous operation since it may result in a network request
                 * @param {string} level 
                 * @returns {object | array | string}
                 */
                async preload(level) {
                    if (!levels.includes(level)) {
                        throw new Error(`(${options.name}) Unexpected level name: "${level}". Expected one of the following; "${levels.join(', ')}"`);
                    }

                    const levelAssets = unwrapped[level];

                    await preloadAssets(levelAssets);
                    return levelAssets;
                },

                /**
                 * Preloads all levels in this bundle
                 * @returns {object}
                 */
                async preloadAll() {
                    await preloadAssets(unwrapped);
                    return unwrapped;
                },

                /**
                 * Get all sprites for a specific level, and does not load the sprites (lazy loading)
                 * Important note, a network request will be sent to fetch the image only once the sprite is assigned to an image src
                 * If the image src is updated before the network request finishes, then the current network request will be canceled and replaced by a new one
                 * In the case that you rapidly switch between sprites (such as an animation), this may result in no sprite ever getting the time to load, and no sprite will be displayed at all 
                 * Consider using preload() instead
                 * @param {string} level 
                 * @returns {object | array | string}
                 */
                get(level) {
                    if (!levels.includes(level)) {
                        throw new Error(`(${options.name}) Unexpected level name: "${level}"; "${levels.join(', ')}"`);
                    }

                    return unwrapped[level];
                },

                /**
                 * Returns all level bundles
                 * @returns {object} An object contaning each level
                 */
                getAll() {
                    return unwrapped;
                },

                /**
                 * Returns the contents of all bundles in a single object
                 * Useful in the case the level of origin is not known
                 */
                getCombined() {
                    let combined = {};
                    Object.values(unwrapped).forEach((bundle) => {
                        Object.assign(combined, bundle);
                    });
                    return combined;
                }
            };
        }

        default: {
            throw new Error(`Unrecognized loader type.`
                + ` Got "${options.type}". Expected: ${Object.keys(LOADER_TYPE).join(', ')}`)
        }
    }
}

/**
 *
 * @param modules A list of modules imported through import.meta.glob()
 * @param moduleName The name of the group. Used for debugging purposes (optional)
 * @returns
 */
// export function createLevelGroupLoader(modules, moduleName = null) {
//     const levelNames = ['earth', 'moon', 'mars', 'jupiter', 'titan'];
//     levelNames.forEach((level) => {
//         if (!modules[getBundlePath(level)]) {
//             throw new Error(`Expected to find "${getBundlePath(level)}" in modules. Available: ${Object.keys(modules).join(', ')}`);
//         }
//     });

//     const unwrapped = unwrapLevelGroup(modules);

//     return {
//         /**
//          * Get all sprites belonging to a specific level, as well as making sure all sprites are pre-loaded
//          * This is an asynchronous operation since it may result in a network request
//          * @param {string} level 
//          * @returns {object | array | string}
//          */
//         async preload(level) {
//             if (!levelNames.includes(level)) {
//                 throw new Error(`(${moduleName}) Unexpected level name: ${level}`);
//             }

//             const levelAssets = unwrapped[level];

//             await preloadAssets(levelAssets);
//             //console.log(`Preloaded assets (${moduleName}): `, levelAssets);
//             return levelAssets;
//         },

//         /**
//          * Preloads all levels in this bundle
//          * @returns {object}
//          */
//         async preloadAll() {
//             await preloadAssets(unwrapped);
//             return unwrapped;
//         },

//         /**
//          * Get all sprites for a specific level, and does not load the sprites (lazy loading)
//          * Important note, a network request will be sent to fetch the image only once the sprite is assigned to an image src
//          * If the image src is updated before the network request finishes, then the current network request will be canceled and replaced by a new one
//          * In the case that you rapidly switch between sprites (such as an animation), this may result in no sprite ever getting the time to load, and no sprite will be displayed at all 
//          * Consider using preload() instead
//          * @param {string} level 
//          * @returns {object | array | string}
//          */
//         get(level) {
//             if (!levelNames.includes(level)) {
//                 throw new Error(`(${moduleName}) Unexpected level name: ${level}`);
//             }

//             return unwrapped[level];
//         },

//         /**
//          * Returns all level bundles
//          * @returns {object} An object contaning each level
//          */
//         getAll() {
//             return unwrapped;
//         },

//         /**
//          * Returns the contents of all bundles in a single object
//          * Useful in the case the level of origin is not known
//          */
//         getCombined() {
//             let combined = {};
//             Object.values(unwrapped).forEach((bundle) => {
//                 Object.assign(combined, bundle);
//             });
//             return combined;
//         }
//     };
// }

/**
 * Handles a single asset bundle.
 * Expects no more and no less than a single module
 * @param module
 */
// export function createBundleLoader(modules, moduleName = "unnamed module") {
//     if (Object.keys(modules).length !== 1) {
//         throw new Error(`Expected one module, recieved ${Object.keys(modules).length} module(s).`
//             + ` Modules recieved: ${Object.keys(modules).join(", ")}`);
//     }

//     const bundle = modules[Object.keys(modules)[0]].default;

//     return {
//         async preload() {
//             await preloadAssets(bundle);
//             return bundle;
//         },

//         get() {
//             return bundle;
//         }
//     }
// }

// export function createAssetLoader(url) {
//     return {
//         async preload() {
//             await preloadAssets(url);
//             return url;
//         },

//         get() {
//             return url;
//         }
//     }
// }