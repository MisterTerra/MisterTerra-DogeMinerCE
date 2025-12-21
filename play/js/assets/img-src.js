import { buildHelperSpriteObj, normalizeModules } from './asset-utils';

const characterModules = normalizeModules(import.meta.glob('../../assets/general/character/*.png',   { eager: true, import: 'default' }));
export const characterImgs = {
    earth: {
        open:    characterModules.standard,
        closed:  characterModules.closed_eyes,
        happy:   characterModules.happydoge,
        unhappy: characterModules.nothappydoge,
    },
    moon: {
        open:    characterModules.spacehelmet,
        closed:  characterModules.closed_space,
        happy:   characterModules.happy_space,
    },
    mars: {
        open:    characterModules.party,
        closed:  characterModules.party, // No "closed" version of this sprite exists, so use open instead
        happy:   characterModules.happy_party,
    },
    jupiter: {
        open:    characterModules.spacehelmet,
        closed:  characterModules.closed_space,
        happy:   characterModules.happy_space,
    },
    titan: {
        open:    characterModules.spacehelmet,
        closed:  characterModules.closed_space,
        happy:   characterModules.happy_space,
    }
};

const rockModules = normalizeModules(import.meta.glob('../../assets/general/rocks/*.png',   { eager: true, import: 'default' }));
const rockOrder = ['0', '1', '2', '3', '4', '5'];
export const rockImgs = {
    earth:   rockOrder.map(k => rockModules['earth_' + k]),
    moon:    rockOrder.map(k => rockModules['moon_' + k]),
    mars:    rockOrder.map(k => rockModules['mars_' + k]),
    jupiter: rockOrder.map(k => rockModules['jupiter_' + k]),
    titan:   rockOrder.map(k => rockModules['titan_' + k]),
};

const backgroundModules = normalizeModules(import.meta.glob('../../assets/backgrounds/*.jpg',   { eager: true, import: 'default' }));
export const backgroundImgs = {
    earth:   ['bg1', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg9', 'bg-new'].map(k => backgroundModules[k]),
    moon:    ['bg1', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg9', 'bg-new'].map(k => backgroundModules[k]), // (same as earth since DOM only has 8 background elements)
    mars:    ['bg1', 'bg101', 'bg102', 'bg103', 'bg104', 'bg105', 'bg-new'].map(k => backgroundModules[k]),
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
export const searchDogImgs = ['searchdog_1', 'searchdog_2'].map(k => searchdogModules[k]);

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
export const helperImgs = {
    earth: buildHelperSpriteObj(
        helperModules, {
        miningShibe: 'shibes',
        dogeKennels: 'kennels',
        streamerKittens: 'kittens',
        spaceRocket: 'rockets',
        timeMachineRig: 'rigs',
        infiniteDogebility: 'dogebility',
    }),

    moon: buildHelperSpriteObj(
        helperModules, {
        moonBase: 'bases',
        moonShibe: 'moonshibe',
        dogeCar: 'dogecar',
        landerShibe: 'landershibe',
        marsRocket: 'marsrocket',
        dogeGate: 'dogegate',
    }),
    
    mars: buildHelperSpriteObj(
        helperModules, {
        marsBase: 'marsbase',
        partyShibe: 'partyshibe',
        curiosiDoge: 'curiosidoge',
        djKittenz: 'djkittenz',
        spaceBass: 'spacebass',
        jupiterRocket: 'juprocket',
    }),

    jupiter: buildHelperSpriteObj(
        helperModules, {
        cloudBase: 'jupiterbase',
        superShibe: 'supershibe',
        dogeAirShip: 'airship',
        flyingDoggo: 'flyingdoge',
        tardogeis: 'tardogeis',
        dogeStar: 'dogestar',
    }),

    titan: buildHelperSpriteObj(
        helperModules, {
        titanBase: 'titanbase',
        roboShibe: 'roboshibe',
        heavyDogeWalker: 'walker',
        coinSeeker5000: 'seeker',
        timeTravelDRex: 'trex',
        altarOfTheSunDoge: 'altarofthesundoge',
    }),
}

import earthParticle from '../../assets/general/particles/earth_particle.png';
export const particleImgs = {
    earth: earthParticle,
}