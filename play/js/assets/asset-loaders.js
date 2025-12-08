import { createAssetLoader, createBundleLoader, createLevelGroupLoader } from './asset-loader-factory.js';

// All import.meta.glob calls use the { eager: true } option
// This means that all modules will be evaluated at build time
// Since each module only contains URLs, no actual image data is made available at build time
// By using eager, we avoid additional network requests, and all network requests fetch image data

/** 
 * TODO: Consider decommissioning the use of import.meta.glob()
 * They're no longer necessary, and add additional complexity that serves no real purpose
 * The only reason to keep them is in the case we still want to divide all levels into their own files
 * I recommend keeping a single file for each "bundle"
 * 
 * EDIT: Actually, they do serve a very important purpose
 * The { eager: true } flag carries major significance, it means that the module is "loaded" during build time
 * Essentially, the modules are removed during build-time and their exports simply inlined in place of the import.meta.glob() call
 * Can you import images eagerly? What happens then? (do you get the URL or data:img)
 * In any case, we should make a function which automatically builds the import.meta.glob call (IF POSSIBLE, doesn't accept dynamic file paths)
 */

export const characterLoader = createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/character/' }), 'character');
export const rockLoader = createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/rocks/' }), 'rock');
export const backgroundLoader = createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/backgrounds/' }), 'background');
export const platformLoader = createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/quickUI/platforms/' }), 'platform');
export const helperLoader = createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/helpers/' }), 'helper');
export const musicLoader = createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/audio/music/' }), 'music');

export const generalLoader = createBundleLoader(import.meta.glob('./general.js', { eager: true, base: '../../assets/general/' }))

export const pickAudioLoader = createBundleLoader(import.meta.glob('./pick.js', { eager: true, base: '../../assets/audio/main/pick/' }))
export const searchdogLoader = createBundleLoader(import.meta.glob('./searchdog.js', { eager: true, base: '../../assets/general/searchdog/' }))

export const planetIconLoader = createBundleLoader(import.meta.glob('./planets.js', { eager: true, base: '../../assets/general/icons/planets/' }))

/**
 * TODO: Is there a better way of doing this?
 * If its possible to inline pickSprite, that would be much cleaner
 */
import pickSprite from '../../assets/items/pickaxes/standard.png';
export const pickaxeLoader = createAssetLoader(pickSprite);

import particleSprite from '../../assets/general/rocks/earth_particle.png';
export const particleLoader = createAssetLoader(particleSprite);

import portalSprite from '../../assets/general/rm/portal.png';
export const portalLoader = createAssetLoader(portalSprite);
export const rickLoader = createBundleLoader(import.meta.glob('./rick.js', { eager: true, base: '../../assets/general/rm/' }));

import launchSprite from '../../assets/The Moon Launch.mp4';
export const moonLaunchLoader = createAssetLoader(launchSprite);