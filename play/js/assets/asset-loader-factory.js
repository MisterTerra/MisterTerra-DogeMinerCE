import { preloadAssets } from "./asset-preload";

export const LOADER_TYPE = Object.freeze({
    SINGLE: "single",
    GROUP: "group",
    BUNDLE: "bundle"
});

const LEVEL = Object.freeze({
    EARTH: 'earth',
    MOON: 'moon',
    MARS: 'mars',
    JUPITER: 'jupiter',
    TITAN: 'titan'
});

const LOADER_ERROR = Object.freeze({
    TYPE: 'Unexpected input type',
    COUNT: 'Count mismatch',
    MISSING_LEVEL: 'Expected '
});

function getBundlePath(str) {
    return `./${str}.js`;
}

// TODO: Should we avoid side-effects with these validators? Preferebly, I don't want to write a new "throw new Error" every time we validate
// TODO: Maybe it returns a string "errMessage", so if message is empty, then we're good (then we have to do !validate() which doesn't look nice)
function validateType(expected, name, assets) {
    if (typeof assets !== expected) {
        throw new Error(`(${name}) Unexpected type. Expected: "${expected}". Recieved: "${typeof assets}".`);
    }
}

function validateCount(expected, name, assets) {
    const modCount = Object.keys(assets).length;
    if (modCount !== expected) {
        throw new Error(`(${name}) Unexpected module count. Expected: "${expected} module(s)". Recieved: "${modCount}" module(s).`);
    }
}

function validateLevels(expected, name, assets) {
    expected.forEach((key) => {
        if (!assets[getBundlePath(key)]) {
            throw new Error(`(${name}) Missing module. Expected: ${getBundlePath(key)}. Recieved: "${Object.keys(assets).join(', ')}".`);
        }
    });
}

/**
 * Remove the surrounding ./*.js around the keys
 * @param {*} input
 * @returns 
 */
function unwrapModuleKeys(name, input) {
    const unwrapped = {};
    Object.entries(input).forEach(([key, value]) => {
        const strippedKey = key.substring(0, key.length - 3).substring(2);
        unwrapped[strippedKey] = value.default;
    });
    return unwrapped;
}

export function createAssetLoader(assets, options) {
    switch (options.type) {
        case LOADER_TYPE.SINGLE: {
            if (typeof assets !== "string") {
                throwErr(options.name, LOADER_ERROR.TYPE, typeof assets, "string");
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
            validateType('object', options.name, assets);
            validateCount(1, options.name, assets);

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
                throwErr(options.name, LOADER_ERROR.TYPE, typeof assets, "object");
            }

            if (Object.values(assets).length !== Object.keys(LEVEL).length) {
                throwErr(options.name, LOADER_ERROR.COUNT, Object.keys(assets).length,)
                throw new Error(`(${options.name}) Unexpected module count. Got ${Object.keys(assets).length}, expected ${Object.values(LEVEL).length}`)
            }

            const missing = [];
            Object.values(LEVEL).forEach((level) => {
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
                    if (!Object.keys(LEVEL).includes(level)) {
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