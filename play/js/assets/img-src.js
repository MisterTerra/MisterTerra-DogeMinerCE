import { normalizeModules } from './asset-utils';

const characterModules = normalizeModules(import.meta.glob('../../assets/general/character/*.png',   { eager: true, import: 'default' }));
export const characterImgs = {
    earth: {
        open:    characterModules.standardOpen,
        closed:  characterModules.standardClosed,
        happy:   characterModules.standardHappy,
        unhappy: characterModules.standardUnhappy,
    },
    moon: {
        open:    characterModules.spaceOpen,
        closed:  characterModules.spaceClosed,
        happy:   characterModules.spaceHappy,
    },
    mars: {
        open:    characterModules.partyOpen,
        closed:  characterModules.partyOpen, // No "closed" version of this sprite exists, so use open instead
        happy:   characterModules.partyHappy,
    },
    jupiter: {
        open:    characterModules.spaceOpen,
        closed:  characterModules.spaceClosed,
        happy:   characterModules.spaceHappy,
    },
    titan: {
        open:    characterModules.spaceOpen,
        closed:  characterModules.spaceClosed,
        happy:   characterModules.spaceHappy,
    }
};

const rockModules = normalizeModules(import.meta.glob('../../assets/general/rocks/*.png',   { eager: true, import: 'default' }));
const rockSrcOrder = ['0', '1', '2', '3', '4', '5'];
export const rockImgs = {
    earth:   [rockSrcOrder.map(k => rockModules['earth_' + k])],
    moon:    [rockSrcOrder.map(k => rockModules['moon_' + k])],
    mars:    [rockSrcOrder.map(k => rockModules['mars_' + k])],
    jupiter: [rockSrcOrder.map(k => rockModules['jupiter_' + k])],
    titan:   [rockSrcOrder.map(k => rockModules['titan_' + k])],
};

const backgroundModules = normalizeModules(import.meta.glob('../../assets/backgrounds/*.jpg',   { eager: true, import: 'default' }));
export const backgroundImgs = {
    earth:   ['bg1', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg9', 'bgNew'].map(k => backgroundModules[k]),
    moon:    ['bg1', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg9', 'bgNew'].map(k => backgroundModules[k]), // (same as earth since DOM only has 8 background elements)
    mars:    ['bg1', 'bg101', 'bg102', 'bg103', 'bg104', 'bg105', 'bgNew'].map(k => backgroundModules[k]),
    jupiter: ['bgjup01', 'bgjup02', 'bgjup03', 'dogewow'].map(k => backgroundModules[k]),
    titan:   ['titan02', 'titan03', 'titan04', 'titan05'].map(k => backgroundModules[k]), // Titan uses its own background set for atmospheric effect
};

const platformModules = normalizeModules(import.meta.glob('../../assets/quickUI/platforms/*.png',   { eager: true, import: 'default' }));
export const platformImgs = {
    earth:   platformModules.earth,
    moon:    platformModules.moon,
    mars:    platformModules.mars,
    jupiter: platformModules.jupiter,
    titan:   platformModules.titan,
};

import coinSprite from '../../assets/general/dogecoin_70x70.png';
import btnDown from '../../assets/general/btn_down.png';
import btnUp from '../../assets/general/btn_up.png';

export const generalImgs = {
    coin: coinSprite,
    btnDown: btnDown,
    btnUp: btnUp,
};

const searchdogModules = normalizeModules(import.meta.glob('../../assets/general/searchdog/*.png',   { eager: true, import: 'default' }));
export const searchDogImgs = [['searchdog_1', 'searchdog_2'].map(k => searchdogModules[k])];

const planetIconModules = normalizeModules(import.meta.glob('../../assets/general/icons/planets/*.png', { eager: true, import: 'default'}));
const planetIconImgs = {};
['earth', 'moon', 'mars', 'jupiter', 'titan'].forEach(k => planetIconImgs[k] = planetIconModules[k]);
export { planetIconImgs };

const rickModules = normalizeModules(import.meta.glob('../../assets/general/rm/*.png'));
export const rickImgs = {
    portal: rickModules.portal,
    frames: ['r1', 'r2', 'r3', 'r4'].map(k => rickModules[k]),
};

const helperModules = normalizeModules(import.meta.glob('../../assets/helpers/*/*.png', { eager: true, import: 'default' }));

/**
 * Utility function to fetch all sprites belonging to a specific helper. We assume (1): for each "idle" sprite,
 * there is a corresponding "mine" sprite, and (2): each file name follows the naming convention "[prefix]-['idle' | 'mine']-[level]"
 * @param {number} levelCount 
 * @param {string} prefix 
 * @returns {{idle: string[], mine: string[]}}
 */
function getHelperSprites(prefix) {
    const sprites = {idle: [], mine: []};

    let i = 0;
    while (helperModules[prefix + '-idle-' + i] && helperModules[prefix + '-mine-' + i]) {
        sprites.idle.push(helperModules[prefix + '-idle-' + i]);
        sprites.idle.push(helperModules[prefix + '-mine-' + i]);
        i++;
    }
    if(sprites.idle.length === 0 || sprites.mine.length === 0) {
        throw new Error('Unable to find any sprites for helper: ' + prefix);
    }
    return sprites;
}

export const helperImgs = {
    earth: {
        miningShibe: getHelperSprites('shibes'),
        dogeKennels: getHelperSprites('kennels'),
        streamerKittens: getHelperSprites('kittens'),
        spaceRocket: getHelperSprites('rockets'),
        timeMachineRig: getHelperSprites('rigs'),
        infiniteDogebility: getHelperSprites('dogebility'),
    },

    moon: {
        moonBase: getHelperSprites('bases'),
        moonShibe: getHelperSprites('moonshibe'),
        dogeCar: getHelperSprites('dogecar'),
        landerShibe: getHelperSprites('landershibe'),
        marsRocket: getHelperSprites('marsrocket'),
        dogeGate: getHelperSprites('dogegate'),
    },
    
    mars: {
        marsBase: getHelperSprites('marsbase'),
        partyShibe: getHelperSprites('partyshibe'),
        curiosiDoge: getHelperSprites('curiosidoge'),
        djKittenz: getHelperSprites('djkittenz'),
        spaceBass: getHelperSprites('spacebass'),
        jupiterRocket: getHelperSprites('juprocket'),
    },

    jupiter: {
        cloudBase: getHelperSprites('jupiterbase'),
        superShibe: getHelperSprites('supershibe'),
        dogeAirShip: getHelperSprites('flyingdoge'),
        tardogeis: getHelperSprites('tardogeis'),
        dogeStar: getHelperSprites('dogestar'),
    },

    titan: {
        titanBase: getHelperSprites('titanbase'),
        roboShibe: getHelperSprites('roboshibe'),
        heavyDogeWalker: getHelperSprites('walker'),
        coinSeeker5000: getHelperSprites('seeker'),
        timeTravelDRex: getHelperSprites('trex'),
        altarOfTheSunDoge: getHelperSprites('altarofthesundoge'),
    }
}