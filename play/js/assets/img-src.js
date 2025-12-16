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


// TODO: rename files to make them easy to iterate (e.g. earth_0, earth_1, earth_2, earth_3 etc...)
// We can save a lot of trouble by choosing meaningful filenames and directory structure
const earthRocks   = normalizeModules(import.meta.glob('../../assets/general/rocks/earth*.png',   { eager: true, import: 'default' }));
const moonRocks    = normalizeModules(import.meta.glob('../../assets/general/rocks/moon*.png',    { eager: true, import: 'default' }));
const marsRocks    = normalizeModules(import.meta.glob('../../assets/general/rocks/mars*.png',    { eager: true, import: 'default' }));
const jupiterRocks = normalizeModules(import.meta.glob('../../assets/general/rocks/jupiter*.png', { eager: true, import: 'default' }));
const titanRocks   = normalizeModules(import.meta.glob('../../assets/general/rocks/titan*.png',   { eager: true, import: 'default' }));

const rocks = {
    earth: earthRocks,
    moon: moonRocks,
    mars: marsRocks,
    jupiter: jupiterRocks,
    titan: titanRocks,
};

import bg1 from '../../assets/backgrounds/bg1.jpg';
import bg3 from '../../assets/backgrounds/bg3.jpg';
import bg4 from '../../assets/backgrounds/bg4.jpg';
import bg5 from '../../assets/backgrounds/bg5.jpg';
import bg6 from '../../assets/backgrounds/bg6.jpg';
import bg7 from '../../assets/backgrounds/bg7.jpg';
import bg9 from '../../assets/backgrounds/bg9.jpg';
import bgNew from '../../assets/backgrounds/bg-new.jpg';

// const backgrounds = normalizeModules(import.meta.glob('./*.jpg', { eager: true, import: 'default'}));

import bg101 from './bg101.jpg';
import bg102 from './bg102.jpg';
import bg103 from './bg103.jpg';
import bg104 from './bg104.jpg';
import bg105 from './bg105.jpg';

import bgjup01 from './bgjup01.jpg';
import bgjup02 from './bgjup02.jpg';
import bgjup03 from './bgjup03.jpg';
import dogewow from './dogewow.jpg';

import titan02 from './titan02.jpg';
import titan03 from './titan03.jpg';
import titan04 from './titan04.jpg';
import titan05 from './titan05.jpg';

const backgrounds = {
    earth: [bg1, bg3, bg4, bg5, bg6, bg7, bg9, bgNew],
    moon: [bg1, bg3, bg4, bg5, bg6, bg7, bg9, bgNew], // (same as earth since DOM only has 8 background elements)
    mars: [bg6, bg101, bg102, bg103, bg104, bg105, bgNew],
    jupiter: [bgjup01, bgjup02, bgjup03, dogewow],
    titan: [titan02, titan03, titan04, titan05] // Titan uses its own background set for atmospheric effect
}

import earthPlatform from './dogeplatform.png';
import moonPlatform from './dogeplatformmoon.png';
import marsPlatform from './marsdogeplatform.png';
import jupiterPlatform from './jupiterdogeplatform.png';
import titanPlatform from './titandogeplatform.png';

const platforms = {
    earth: earthPlatform,
    moon: moonPlatform,
    mars: marsPlatform,
    jupiter: jupiterPlatform,
    titan: titanPlatform
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