import { createBundleLoader } from './asset-loader-factory.js';

export const characterSprites = createBundleLoader(import.meta.glob('./*.js', {base: '../../assets/general/character/'}));
export const rockSprites = createBundleLoader(import.meta.glob('./*.js', {base: '../../assets/general/rocks/'}));
export const backgroundSprites = createBundleLoader(import.meta.glob('./*.js', {base: '../../assets/backgrounds/'}));
export const platformSprites = createBundleLoader(import.meta.glob('./*.js', {base: '../../assets/quickUI/platforms/'}));
export const helperSprites = createBundleLoader(import.meta.glob('./*.js', {base: '../../assets/helpers/'}));

export async function loadLevelAssets(level) {
    return Promise.all([
        characterSprites.load(level),
        rockSprites.load(level),
        backgroundSprites.load(level),
        platformSprites.load(level),
        helperSprites.load(level),
    ]);
}