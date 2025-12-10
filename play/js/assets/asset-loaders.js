import { createAssetLoader, createBundleLoader, createLevelGroupLoader, LOADER_TYPE } from './asset-loader-factory.js';

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

export const impLoaderCharacter = createAssetLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/character/' }), { type: LOADER_TYPE.GROUP, name: 'character sprite' });
export const imgLoaderRock = createAssetLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/rocks/' }), { type: LOADER_TYPE.GROUP, name: 'rock sprite' });
export const imgLoaderBackground = createAssetLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/backgrounds/' }), { type: LOADER_TYPE.GROUP, name: 'background sprite' });
export const imgLoaderPlatform = createAssetLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/quickUI/platforms/' }), { type: LOADER_TYPE.GROUP, name: 'platform sprite' });
export const imgLoaderHelper = createAssetLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/helpers/' }), { type: LOADER_TYPE.GROUP, name: 'helper sprite' });
export const audioLoaderMusic = createAssetLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/audio/music/' }), { type: LOADER_TYPE.GROUP, name: 'music sfx' });

export const imgLoaderGeneral = createAssetLoader(import.meta.glob('./general.js', { eager: true, base: '../../assets/general/' }), { type: LOADER_TYPE.BUNDLE, name: 'general sprite' });
export const audioLoaderPickaxe = createAssetLoader(import.meta.glob('./pick.js', { eager: true, base: '../../assets/audio/main/pick/' }), { type: LOADER_TYPE.BUNDLE, name: 'pickaxe sfx' });
export const imgLoaderSearchdog = createAssetLoader(import.meta.glob('./searchdog.js', { eager: true, base: '../../assets/general/searchdog/' }), { type: LOADER_TYPE.BUNDLE, name: 'searchdog sprite' });
export const imgLoaderPlanetIcon = createAssetLoader(import.meta.glob('./planets.js', { eager: true, base: '../../assets/general/icons/planets/' }), { type: LOADER_TYPE.BUNDLE, name: 'planetIcon sprite' });

/**
 * TODO: Is there a better way of doing this?
 * If its possible to inline pickSprite, that would be much cleaner
 */

import pickSprite from '../../assets/items/pickaxes/standard.png';
export const imgLoaderPickaxe = createAssetLoader(pickSprite, { type: LOADER_TYPE.SINGLE, name: 'pickaxe' });

import particleSprite from '../../assets/general/rocks/earth_particle.png';
export const imgLoaderParticle = createAssetLoader(particleSprite, { type: LOADER_TYPE.SINGLE, name: 'particle' });

import portalSprite from '../../assets/general/rm/portal.png';
export const imgLoaderPortal = createAssetLoader(portalSprite, { type: LOADER_TYPE.SINGLE, name: 'portal' });

export const imgLoaderRick = createAssetLoader(import.meta.glob('./rick.js', { eager: true, base: '../../assets/general/rm/' }), { type: LOADER_TYPE.BUNDLE, name: 'rick' });

import launchSprite from '../../assets/The Moon Launch.mp4';
export const videoLoaderMoonLaunch = createAssetLoader(launchSprite, { type: LOADER_TYPE.SINGLE, name: 'moon launch' });