import uiManager from "../ui.js";
import { characterLoader, rockLoader, backgroundLoader, platformLoader,
  helperLoader, pickAudioLoader, searchdogLoader, pickaxeLoader } from "./asset-loaders";

// File type detection
const IMAGE_EXT = /\.(png|jpg|jpeg|gif|webp|avif|svg)$/i;
const IMAGE_INLINED = /^data:image/i;

const AUDIO_EXT = /\.(mp3|wav|ogg|aac|flac|m4a)$/i;
const AUDIO_INLINED = /^data:audio/i;

const VIDEO_EXT = /\.(mp4|webm|ogv|mov)$/i;

// Will contain *all* URLs loaded through the preload functions
const cache = new Map();

/**
 * Recursively extracts image URLs from arrays or objects
 */
function extractUrls(input, urls = new Set()) {
  if (!input) return urls;

  if (typeof input === 'string') {
    urls.add(input);
    return urls;
  }

  if (Array.isArray(input)) {
    for (const item of input) {
      extractUrls(item, urls);
    }
    return urls;
  }

  if (typeof input === 'object') {
    for (const value of Object.values(input)) {
      extractUrls(value, urls);
    }
    return urls;
  }

  return urls;
}

// TODO: This function should be called "preloadAssets" and accept images, audio and video
/**
 * Preloads all images found in a string, array or object
 */
export function preloadAssets(input, promiseAll = true) {
  const urls = [...extractUrls(input)];

  let promises = [];
  
  // TODO: Only set cache if promise resolves
  urls.forEach((url) => {

    if (IMAGE_EXT.test(url) || IMAGE_INLINED.test(url)) {
      promises.push(new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = reject;
        img.src = url;
      }));
      cache.set(url);
      return;
    }

    if (AUDIO_EXT.test(url) || AUDIO_INLINED.test(url)) {
      promises.push(new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.oncanplaythrough = () => resolve(url);
        audio.onerror = reject;
        audio.src = url;
        audio.load();
      }));
      cache.set(url);
      return;
    }

    if (VIDEO_EXT.test(url)) {
      promises.push(new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.oncanplaythrough = () => resolve(url);
        video.onerror = reject;
        video.src = url;
        video.load();
      }));
      cache.set(url);
      return;
    }

      throw new Error(`Unsupported asset type: "${url}". Please make sure the file extension is valid and is defined in this module.`);
  });

  if(promiseAll) {
    return Promise.all(promises);
  } else {
    return promises;
  }
}

function createLevelPreloader(level) {
  const assets = {
    // Groups of bundled assets
    characterSprites: characterLoader,
    rockSprites: rockLoader,
    backgroundSprites: backgroundLoader,
    platformSprites: platformLoader,
    helperSprites: helperLoader,

    // Bundled assets
    pickAudioSprites: pickAudioLoader,
    searchdogSprites: searchdogLoader,

    // Single assets
    pickaxeSprite: pickaxeLoader
  }
  
  return {
    assetCount: Object.keys(assets).length,

    load: async (onBundleLoad) => {
      await Promise.all(
        Object.entries(assets).map(async ([key, bundle]) => {
          const sprites = await bundle.preload(level);
          onBundleLoad(key, sprites);
        }).concat(
          preloadAssets(assets, false)
        )
      );
    }
  }
}

// TODO: Remove the "silent" option from this function. Whether or not the loading screen updates should be up to the caller
// Add another callback instead, which is called whenever a promise is resolved (whenever preloadProgress is incremented)
// The callback should be called with preloadProgress, assetCount, and sprites
export async function preloadLevelAssets(level, silent = false) {
  const preloader = createLevelPreloader(level);
  let preloadProgress = 0;
  let preloadedSprites = {};

  await preloader.load((key, sprites) => {
      preloadProgress++;
      if(!silent) {
        uiManager.updateLoadingInfoSecondary(`Loading level assets: ${preloadProgress} / ${preloader.assetCount}`);
      }
      preloadedSprites[key] = sprites;
  });

  return preloadedSprites;
}