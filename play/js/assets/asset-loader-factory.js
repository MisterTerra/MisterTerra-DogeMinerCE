export function createLevelBundleLoader(modules) {
    const cache = new Map();

    // TODO: Enforce that modules should contain ./earth.js, ./moon.js, ./mars.js etc...

    return {
        async load(level) {
            if (cache.has(level)) {
                return cache.get(level);
            }

            const key = `./${level}.js`;
            const loader = modules[key];

            if (!loader) {
                throw new Error(`Sprite bundle "${level}" not found. Available: ${Object.keys(modules).join(", ")}`);
            }

            const module = await loader();
            cache.set(level, module.default);
            return module.default;
        },
    };
}

/**
 * Handles a single asset bundle.
 * Expects no more and no less than a single module
 * @param module 
 */
export function createBundleLoader(modules) {
    const cache = null;

    if (Object.keys(modules).length !== 1) {
        throw new Error(`Expected one module, recieved ${Object.keys(modules).length} module(s).`
            + ` Modules recieved ${Object.keys(modules).join(", ")}`);
    }

    console.log(modules);
    const module = modules[Object.keys(modules)[0]];
    console.log(module);

    return {
        async load() {
            if (cache) {
                return cache;
            }

            const mod = await module();
            return mod.default;
        }
    }
}

export function registerAssetPreload(modules) {
    const preloads = {};
    // TODO: Merge preloads and modules (or figure out a better solution)
}