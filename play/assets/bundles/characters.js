import { Utils } from '../../js/utils.js';

// Character sprites

import standardOpen from '../general/character/standard.png';
import standardClosed from '../general/character/closed_eyes.png';
import standardHappy from '../general/character/happydoge.png';
import standardUnhappy from '../general/character/nothappydoge.png';

import spaceOpen from '../general/character/spacehelmet.png';
import spaceClosed from '../general/character/closed_space.png';
import spaceHappy from '../general/character/happy_space.png';

import partyOpen from '../general/character/party.png';
import partyHappy from '../general/character/happy_party.png';

export const characterSprites = Utils.deepFreeze({
    earth: {
        open: standardOpen,
        closed: standardClosed,
        happy: standardHappy,
        unhappy: standardUnhappy
    },
    moon: {
        open: spaceOpen,
        closed: spaceClosed,
        happy: spaceHappy
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
});