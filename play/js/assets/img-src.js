import { normalizeModules } from './asset-utils';

const groups = {
    helper: group(import.meta.glob('./*.js', { eager: true, base: '../../assets/helpers/' }))
};

const bundles = {
    rick: bundle(import.meta.glob('./rick.js', { eager: true, base: '../../assets/general/rm/' })),
};

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

const planetIconModules = import.meta.glob('../../assets/general/icons/planets/*.png', { eager: true, import: 'default'});
const planetIconImgs = {};
['earth', 'moon', 'mars', 'jupiter', 'titan'].forEach(k => planetIconImgs[k] = planetIconModules[k]);
export { planetIconImgs };

