// TODO: This file is useless when building for an offline build.
// If were building for an offline build, disable this module (and replace all usages)
// Look into using import.meta.env

// File type detection
const IMAGE_EXT = /\.(png|jpg|jpeg|gif|webp|avif|svg)$/i;
const IMAGE_INLINED = /^data:image/i;

const AUDIO_EXT = /\.(mp3|wav|ogg|aac|flac|m4a)$/i;
const AUDIO_INLINED = /^data:audio/i;

const VIDEO_EXT = /\.(mp4|webm|ogv|mov)$/i;

// Will contain all preloaded URLs
const cache = new Map();

/**
 * Recursively extracts image URLs from an array or object
 */
export function extractUrls(input, urls = new Set()) {
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

/**
 * Preloads the given url. Supports video, audio and image files
 * @param {string} url
 */
export function preloadAsset(url) {
  // Image files
  if (IMAGE_EXT.test(url) || IMAGE_INLINED.test(url)) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        cache.set(url);
        resolve(url);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  // Audio files
  if (AUDIO_EXT.test(url) || AUDIO_INLINED.test(url)) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.oncanplaythrough = () => {
        cache.set(url);
        resolve(url);
      };
      audio.onerror = reject;
      audio.src = url;
      audio.load();
    });
  }

  // Video files
  if (VIDEO_EXT.test(url)) {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "auto";
      video.oncanplaythrough = () => {
        cache.set(url);
        resolve(url);
      };
      video.onerror = reject;
      video.src = url;
      video.load();
    });
  }

  throw new Error(`Unsupported file extension in url: "${url}". Please make sure the file extension is valid and is defined in this module.`);
}

/**
 * Extracts all URLs from an object or array before preloading all extracted URLs
 * @param {object | array | string} src
 * @returns {object | array | string} The same value that was passed in
 */
export async function preloadAll(src, callback) {
  const urls = extractUrls(src);
  
  await Promise.all(Array.from(urls).map(url => {
    new Promise((resolve, reject) => {
      preloadAsset(url).then(() => {
        if(callback) {
          callback(url);
        }
        resolve(url);
      });
    });
  }));

  return src;
}