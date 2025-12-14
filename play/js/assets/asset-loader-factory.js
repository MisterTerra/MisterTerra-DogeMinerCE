throw new Error('This module has been deprecated: ', import.meta.url);

import { preloadAssets } from "./asset-preload";

// const characterImg = import.meta.glob('../../assets/general/character/*.png', { eager: true });
// console.log('CHARACTER IMG:', characterImg);

// These values are better declared elsewhere (since they're used pretty much everywhere)
const levels = ['earth', 'moon', 'mars', 'jupiter', 'titan'];

function getBundlePath(str) {
    return `./${str}.js`;
}

/**
 * Remove the surrounding ./*.js around the keys and extract the default export from the module
 * @param {*} input
 * @returns 
 */
function unwrapModule(input) {
    const unwrapped = {};
    Object.entries(input).forEach(([key, value]) => {
        const strippedKey = key.substring(0, key.length - 3).substring(2);
        unwrapped[strippedKey] = value.default;
    });
    return unwrapped;
}

export function group(src)  {
    if (typeof src !== "object") {
        throw new Error(`Unexpected type. Expected: "object". Recieved: "${typeof assets}". Src: ` + src);
    }

    if (Object.keys(src).length !== levels.length) {
        throw new Error(`Unexpected module count. Expected: (${levels.length}) module(s). Recieved: (${Object.keys(src).length}) module(s). Src: ` + src)
    }

    levels.forEach((level) => {
        if (!src[getBundlePath(level)]) {
            throw new Error(`(${name}) Missing module. Expected: ${getBundlePath(level)}. Recieved: "${Object.keys(src).join(', ')}". Src: ` + src);
        }
    });

    const unwrapped = unwrapModule(src);

    return {
        async preload(level) {
            if (!levels.includes(level)) {
                throw new Error(`Unexpected level name: "${level}". Expected one of the following: (${levels.join(', ')}). Src: ` + src);
            }

            const levelAssets = unwrapped[level];

            await preloadAssets(levelAssets);
            return levelAssets;
        },

        async preloadAll() {
            await preloadAssets(unwrapped);
            return unwrapped;
        },

        get(level) {
            if (!levels.includes(level)) {
                throw new Error(`Unexpected level name: "${level}". Expected one of the following: (${levels.join(', ')}). Src: ` + src);
            }

            return unwrapped[level];
        },

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

export function bundle(src) {
    if (typeof src !== "object") {
        throw new Error(`Unexpected type. Expected: "object". Recieved: "${typeof assets}". Src: ` + src);
    }

    if (Object.keys(src).length !== 1) {
        throw new Error(`Unexpected module count. Expected: (1) module(s). Recieved: (${Object.keys(src).length}) module(s). Src: ` + src)
    }

    const bundle = src[Object.keys(src)[0]].default;

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

export function single(src) {
    if (typeof src !== "string") {
        throw new Error(`Unexpected type. Expected: "string". Recieved: "${typeof assets}". Src: ` + src);
    }

    return {
        async preload() {
            await preloadAssets(src);
            return src;
        },

        get() {
            return src;
        }
    }
}