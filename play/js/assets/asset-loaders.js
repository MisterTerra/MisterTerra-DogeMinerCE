import { createBundleLoader, createLevelBundleLoader } from './asset-loader-factory.js';

export const characterSprites = createLevelBundleLoader(import.meta.glob('./*.js', { base: '../../assets/general/character/' }));
export const rockSprites = createLevelBundleLoader(import.meta.glob('./*.js', { base: '../../assets/general/rocks/' }));
export const backgroundSprites = createLevelBundleLoader(import.meta.glob('./*.js', { base: '../../assets/backgrounds/' }));
export const platformSprites = createLevelBundleLoader(import.meta.glob('./*.js', { base: '../../assets/quickUI/platforms/' }));
export const helperSprites = createLevelBundleLoader(import.meta.glob('./*.js', { base: '../../assets/helpers/' }));
export const musicSprites = createLevelBundleLoader(import.meta.glob('./*.js', { base: '../../assets/audio/music/' }));

export const pickAudioSprites = createBundleLoader(import.meta.glob('./*.js', { base: '../../assets/audio/main/pick/' }))

export async function loadLevelAssets(level) {
  return Promise.all([
    characterSprites.load(level),
    rockSprites.load(level),
    backgroundSprites.load(level),
    platformSprites.load(level),
    helperSprites.load(level),
  ]);
}