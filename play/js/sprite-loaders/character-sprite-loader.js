const characterBundles = import.meta.glob('/assets/general/character/*.js');
const characterCache = new Map();

export async function loadCharacterBundle(level) {
    if (characterCache.has(level)) {
        return characterCache.get(level);
    }

    const path = `/assets/general/character/${level}.js`;
    const loader = characterBundles[path];

    if (!loader) {
        throw new Error('Bundle for level does not exist');
    }

    const bundle = await loader();
    characterCache.set(level, bundle.default);

    return bundle.default;
}