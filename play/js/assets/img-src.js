import { normalizeModules } from './asset-utils';

const groups = {
    platform: group(import.meta.glob('./*.js', { eager: true, base: '../../assets/quickUI/platforms/' })),
    helper: group(import.meta.glob('./*.js', { eager: true, base: '../../assets/helpers/' }))
};

const bundles = {
    general: bundle(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/' })),
    searchdog: bundle(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/searchdog/' })),
    planetIcon: bundle(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/icons/planets/' })),
    rick: bundle(import.meta.glob('./rick.js', { eager: true, base: '../../assets/general/rm/' })),
};


import pick from '../../assets/items/pickaxes/standard.png';
import particle from '../../assets/general/rocks/earth_particle.png';
import portal from '../../assets/general/rm/portal.png';


import standardOpen from '../../assets/general/character/standard.png';
import standardClosed from '../../assets/general/character/closed_eyes.png';
import standardHappy from '../../assets/general/character/happydoge.png';
import standardUnhappy from '../../assets/general/character/nothappydoge.png';

import spaceOpen from '../../assets/general/character/spacehelmet.png';
import spaceClosed from '../../assets/general/character/closed_space.png';
import spaceHappy from '../../assets/general/character/happy_space.png';

import partyOpen from '../../assets/general/character/party.png';
import partyHappy from '../../assets/general/character/happy_party.png';

const characters = {
    earth: {
        open: standardOpen,
        closed: standardClosed,
        happy: standardHappy,
        unhappy: standardUnhappy,
    },
    moon: {
        open: spaceOpen,
        closed: spaceClosed,
        happy: spaceHappy,
    },
    mars: {
        open: partyOpen,
        closed: partyOpen, // No "closed" version of this sprite exists, so use open instead
        happy: partyHappy
    },
    jupiter: {
        open: spaceOpen,
        closed: spaceClosed,
        happy: spaceHappy
    },
    titan: {
        open: spaceOpen,
        closed: spaceClosed,
        happy: spaceHappy
    }
};


const rockSrc = normalizeModules(import.meta.glob('../../assets/general/rocks/earth*.png',   { eager: true, import: 'default' }));
const rockSrcOrder = ['0', '1', '2', '3', '4', '5'];
const rocks = {
    earth:   [rockSrcOrder.map(k => rockSrc['earth_' + k])],
    moon:    [rockSrcOrder.map(k => rockSrc['moon_' + k])],
    mars:    [rockSrcOrder.map(k => rockSrc['mars_' + k])],
    jupiter: [rockSrcOrder.map(k => rockSrc['jupiter_' + k])],
    titan:   [rockSrcOrder.map(k => rockSrc['titan_' + k])],
};

const backgroundSrc = normalizeModules(import.meta.glob('../../assets/backgrounds/*.jpg',   { eager: true, import: 'default' }));
const backgrounds = {
    earth:   ['bg1', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg9', 'bgNew'].map(k => backgroundSrc[k]),
    moon:    ['bg1', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7', 'bg9', 'bgNew'].map(k => backgroundSrc[k]), // (same as earth since DOM only has 8 background elements)
    mars:    ['bg1', 'bg101', 'bg102', 'bg103', 'bg104', 'bg105', 'bgNew'].map(k => backgroundSrc[k]),
    jupiter: ['bgjup01', 'bgjup02', 'bgjup03', 'dogewow'].map(k => backgroundSrc[k]),
    titan:   ['titan02', 'titan03', 'titan04', 'titan05'].map(k => backgroundSrc[k]), // Titan uses its own background set for atmospheric effect
}

const platformSrc = normalizeModules(import.meta.glob('../../assets/quickUI/platforms/*.png',   { eager: true, import: 'default' }));
const platforms = {
    earth: platformSrc.earth,
    moon: platformSrc.moon,
    mars: platformSrc.mars,
    jupiter: platformSrc.jupiter,
    titan: platformSrc.titan,
}


export const imgSrc = {
    characters: characters,
    rocks: rocks,
    backgrounds: backgrounds,
    platforms: platforms,

    pick: pick,
    particle: particle,
    portal: portal,
};