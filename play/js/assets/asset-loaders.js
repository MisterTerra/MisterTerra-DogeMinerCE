import { createLevelBundleLoader } from './assetLoaderFactory.js';

export const characterSprites = createLevelBundleLoader('../../assets/general/character');
export const rockSprites = createLevelBundleLoader('../../assets/general/rocks');
export const backgroundSprites = createLevelBundleLoader('../../assets/backgrounds');
export const platformSprites = createLevelBundleLoader('../../assets/quickUI/platforms');
export const helperSprites = createLevelBundleLoader('../../assets/helpers')

export async function loadLevelAssets(level) {
  return Promise.all([
    characterSprites.load(level),
    rockSprites.load(level),
    backgroundSprites.load(level),
    platformSprites.load(level),
    helperSprites.load(level)
  ]);
}