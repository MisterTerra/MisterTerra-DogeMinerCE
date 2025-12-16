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


import standardOpen from './standard.png';
import standardClosed from './closed_eyes.png';
import standardHappy from './happydoge.png';
import standardUnhappy from './nothappydoge.png';

import spaceOpen from './spacehelmet.png';
import spaceClosed from './closed_space.png';
import spaceHappy from './happy_space.png';

import partyOpen from './party.png';
import partyHappy from './happy_party.png';

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
}


import rockEarth from './earth.png';
import rockEarthSmall1 from './earth_dmg_small1.png';
import rockEarthSmall2 from './earth_dmg_small2.png';
import rockEarthMedium1 from './earth_dmg_medium1.png';
import rockEarthMedium2 from './earth_dmg_medium2.png';
import rockEarthLarge1 from './earth_dmg_large1.png';

import rockMoon from './moon.png';
import rockMoonSmall1 from './moon_dmg_small1.png';
import rockMoonSmall2 from './moon_dmg_small2.png';
import rockMoonMedium1 from './moon_dmg_medium1.png';
import rockMoonMedium2 from './moon_dmg_medium2.png';
import rockMoonLarge1 from './moon_dmg_large1.png';

import rockMars from './mars.png';
import rockMarsSmall1 from './mars_dmg_small1.png';
import rockMarsSmall2 from './mars_dmg_small2.png';
import rockMarsMedium1 from './mars_dmg_medium1.png';
import rockMarsMedium2 from './mars_dmg_medium2.png';
import rockMarsLarge1 from './mars_dmg_large1.png';

import rockJupiter from './jupiter.png';
import rockJupiterSmall1 from './jupiter_dmg_small1.png';
import rockJupiterSmall2 from './jupiter_dmg_small2.png';
import rockJupiterMedium1 from './jupiter_dmg_medium1.png';
import rockJupiterMedium2 from './jupiter_dmg_medium2.png';
import rockJupiterLarge1 from './jupiter_dmg_large1.png';

import rockTitan from './titan.png';
import rockTitanSmall1 from './titan_dmg_small1.png';
import rockTitanSmall2 from './titan_dmg_small2.png';
import rockTitanMedium1 from './titan_dmg_medium1.png';
import rockTitanMedium2 from './titan_dmg_medium2.png';
import rockTitanLarge1 from './titan_dmg_large1.png';

const rocks = {
    earth: [rockEarth, rockEarthSmall1, rockEarthSmall2, rockEarthMedium1, rockEarthMedium2, rockEarthLarge1],
    moon: [rockMoon, rockMoonSmall1, rockMoonSmall2, rockMoonMedium1, rockMoonMedium2, rockMoonLarge1],
    mars: [rockMars, rockMarsSmall1, rockMarsSmall2, rockMarsMedium1, rockMarsMedium2, rockMarsLarge1],
    jupiter: [rockJupiter, rockJupiterSmall1, rockJupiterSmall2, rockJupiterMedium1, rockJupiterMedium2, rockJupiterLarge1],
    titan: [rockTitan, rockTitanSmall1, rockTitanSmall2, rockTitanMedium1, rockTitanMedium2, rockTitanLarge1]
}

import bg1 from './bg1.jpg';
import bg3 from './bg3.jpg';
import bg4 from './bg4.jpg';
import bg5 from './bg5.jpg';
import bg6 from './bg6.jpg';
import bg7 from './bg7.jpg';
import bg9 from './bg9.jpg';
import bgNew from './bg-new.jpg';

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

const platforms = {
    earth: 
}


export const imgSrc = {
    characters: characters,
    rocks: rocks,
    backgrounds: backgrounds,

    pick: pick,
    particle: particle,
    portal: portal,
};