export function createBundleLoader(modules) {
    const cache = new Map();

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
            if (!module.sprites) {
                throw new Error(`${level}.js must export "sprites". Available: ${Object.keys(module).join(", ")}`);
            }
            cache.set(level, module);
            return module.sprites;
        },
    };
}

// Each bundle should contain an entry for each level (eg. earth, moon, mars, jupiter, titan etc...)
// export function createLevelBundleLoaderOLD(basePath) {
//     const expectedModules = ['earth', 'moon', 'mars', 'jupiter', 'titan'];

//     const modules = import.meta.glob(`${basePath}/*.js`);
//     const cache = new Map();

//     for (let index = 0; index < expectedModules.length; index++) {
//         const level = expectedModules[index];
//         if (!modules[level]) {
//             throw new Error(`Missing asset bundle: ${level}`);
//         }
//     }

//     return {
//         async load(level) {
//             if (cache.has(level)) {
//                 return cache.get(level);
//             }

//             const path = `${basePath}/${level}.js`;
//             const loader = modules[path];

//             if (!loader) {
//                 throw new Error(`Missing asset bundle: ${path}`);
//             }

//             const module = await loader();
//             cache.set(level, module);
//             return module;
//         },

//         preload(level) {
//             const path = `${basePath}/${level}.js`;
//             const loader = modules[path];
//             if (loader) loader();
//         },

//         has(level) {
//             return Boolean(modules[`${basePath}/${level}.js`]);
//         },

//         clear(level) {
//             cache.delete(level);
//         },

//         clearAll() {
//             cache.clear();
//         },

//         clearExcept(level) {
//             for (const key of cache.keys()) {
//                 if (key !== level) cache.delete(key);
//             }
//         }
//     };
// }

// // Each bundle can contain whatever, this will load all entries in the bundle
// export function createBundleLoader(path) {
//     const module = import.meta.glob(`${path}`);
//     // import.meta.glob(path)
//     let cache = null;

//     return {
//         async load() {
//             if (cache) return cache;

//             // const entries = await Promise.all(
//             //   Object.entries(module).map(async ([path, loader]) => {
//             //     const mod = await loader();
//             //     return [path, mod.default];
//             //   })
//             // );

//             if (module) {
//                 const mod = await module();
//                 cache = mod;
//             }

//             return cache;
//         },

//         clear() {
//             cache = null;
//         }
//     };
// }
