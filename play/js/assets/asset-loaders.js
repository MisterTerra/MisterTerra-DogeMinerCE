import { createAssetLoader, createBundleLoader, createLevelGroupLoader } from './asset-loader-factory.js';

// All import.meta.glob calls use the { eager: true } option
// This means that all modules will be evaluated at build time
// Since each module only contains URLs, no actual image data is made available at build time
// By using eager, we avoid additional network requests, and all network requests fetch image data

export const characterLoader =  createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/character/' }),   'character');
export const rockLoader =       createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/rocks/' }),       'rock');
export const backgroundLoader = createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/backgrounds/' }),         'background');
export const platformLoader =   createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/quickUI/platforms/' }),   'platform');
export const helperLoader =     createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/helpers/' }),             'helper');
export const musicLoader =      createLevelGroupLoader(import.meta.glob('./*.js', { eager: true, base: '../../assets/audio/music/' }),         'music');

export const generalLoader =    createBundleLoader(import.meta.glob('./general.js', { eager: true, base: '../../assets/general/' }))

export const pickAudioLoader =  createBundleLoader(import.meta.glob('./pick.js', { eager: true, base: '../../assets/audio/main/pick/' }))
export const searchdogLoader =  createBundleLoader(import.meta.glob('./searchdog.js', { eager: true, base: '../../assets/general/searchdog/' }))

export const planetIconLoader = createBundleLoader(import.meta.glob('./planets.js', { eager: true, base: '../../assets/general/icons/planets/' }))

import pickSprite from '../../assets/items/pickaxes/standard.png';
export const pickaxeLoader = createAssetLoader(pickSprite);

import particleSprite from '../../assets/general/rocks/earth_particle.png';
export const particleLoader = createAssetLoader(particleSprite);

import portalSprite from '../../assets/general/rm/portal.png';
export const portalLoader = createAssetLoader(portalSprite);
export const rickLoader = createBundleLoader(import.meta.glob('./rick.js', { eager: true, base: '../../assets/general/rm/' }));

import launchSprite from '../../assets/The Moon Launch.mp4';
export const moonLaunchLoader = createAssetLoader(launchSprite);