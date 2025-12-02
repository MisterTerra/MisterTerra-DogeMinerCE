// Each bundle should contain an entry for each level (eg. earth, moon, mars, jupiter, titan etc...)
export function createLevelBundleLoader(basePath) {
  const modules = import.meta.glob(`${basePath}/*.js`);
  const cache = new Map();

  return {
    async load(level) {
      if (cache.has(level)) {
        return cache.get(level);
      }

      const path = `${basePath}/${level}.js`;
      const loader = modules[path];

      if (!loader) {
        throw new Error(`Missing asset bundle: ${path}`);
      }

      const module = await loader();
      cache.set(level, module.default);
      return module.default;
    },

    preload(level) {
      const path = `${basePath}/${level}.js`;
      const loader = modules[path];
      if (loader) loader();
    },

    has(level) {
      return Boolean(modules[`${basePath}/${level}.js`]);
    },

    clear(level) {
      cache.delete(level);
    },

    clearAll() {
      cache.clear();
    },

    clearExcept(level) {
        for (const key of cache.keys()) {
            if (key !== level) cache.delete(key);
        }
    }
  };
}

// Each bundle can contain whatever, this will load all entries in the bundle
export function createBundleLoader(path) {
  const module = import.meta.glob(`${path}/*.js`);
// import.meta.glob(path)
  let cache = null;

  return {
    async loadAll() {
      if (cache) return cache;

      // We'll only ever have one module here, so no need to iterate over each prop in modules
      // if(module) { await module() }
      const entries = await Promise.all(
        Object.entries(module).map(async ([path, loader]) => {
          const mod = await loader();
          return [path, mod.default];
        })
      );

      cache = Object.fromEntries(entries);
      return cache;
    },

    clear() {
      cache = null;
    }
  };
}