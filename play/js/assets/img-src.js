const groups = {
    rock: group(import.meta.glob('./*.js', { eager: true, base: '../../assets/general/rocks/' })),
    background: group(import.meta.glob('./*.js', { eager: true, base: '../../assets/backgrounds/' })),
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


export const imgSrc = {
    character: {
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
    },

    pick: pick,
    particle: particle,
    portal: portal,
};