import { preloadAssets } from "./asset-preload";

function getBundlePath(str) {
    return `./${str}.js`;
}

function unwrapLevelBundle(bundle) {
    let unwrapped = {};
    Object.entries(bundle).forEach(([key, value]) => {
        let strippedKey = key.substring(0, key.length - 3).substring(2);
        unwrapped[strippedKey] = value.default;
    });
    return unwrapped;
}

/**
 * 
 * @param modules A list of modules imported through import.meta.glob() 
 * @param moduleName The name of the group. Used for debugging purposes (optional)
 * @returns 
 */
export function createLevelGroupLoader(modules, moduleName = null) {
    const levelNames = ['earth', 'moon', 'mars', 'jupiter', 'titan'];
    levelNames.forEach((level) => {
        if (!modules[getBundlePath(level)]) {
            throw new Error(`Expected to find "${getBundlePath(level)}" in modules. Available: ${Object.keys(modules).join(', ')}`);
        }
    });

    const unwrapped = unwrapLevelBundle(modules);

    return {
        /**
         * Get all sprites belonging to a specific level, as well as making sure all sprites are pre-loaded
         * This is an asynchronous operation since it may result in a network request
         * @param {string} level 
         * @returns {object | array | string}
         */
        async preload(level) {
            if (!levelNames.includes(level)) {
                throw new Error(`(${moduleName}) Unexpected level name: ${level}`);
            }

            const levelAssets = unwrapped[level];

            await preloadAssets(levelAssets);
            //console.log(`Preloaded assets (${moduleName}): `, levelAssets);
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
            if (!levelNames.includes(level)) {
                throw new Error(`(${moduleName}) Unexpected level name: ${level}`);
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

/**
 * Handles a single asset bundle.
 * Expects no more and no less than a single module
 * @param module 
 */
export function createBundleLoader(modules, moduleName = "unnamed module") {
    if (Object.keys(modules).length !== 1) {
        throw new Error(`Expected one module, recieved ${Object.keys(modules).length} module(s).`
            + ` Modules recieved: ${Object.keys(modules).join(", ")}`);
    }

    const bundle = modules[Object.keys(modules)[0]].default;

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

export function createAssetLoader(url) {
    return {
        async preload() {
            await preloadAssets(url);
            return url;
        },

        get() {
            return url;
        }
    }
}