import { Utils } from '../../js/utils.js';

import earthParticle from '../general/rocks/earth_particle.png';
import earth from '../general/rocks/earth.png';
import earthSmall1 from '../general/rocks/earth_dmg_small1.png';
import earthSmall2 from '../general/rocks/earth_dmg_small2.png';
import earthMedium1 from '../general/rocks/earth_dmg_medium1.png';
import earthMedium2 from '../general/rocks/earth_dmg_medium2.png';
import earthLarge1 from '../general/rocks/earth_dmg_large1.png';

import moon from '../general/rocks/moon.png';
import moonSmall1 from '../general/rocks/moon_dmg_small1.png';
import moonSmall2 from '../general/rocks/moon_dmg_small2.png';
import moonMedium1 from '../general/rocks/moon_dmg_medium1.png';
import moonMedium2 from '../general/rocks/moon_dmg_medium2.png';
import moonLarge1 from '../general/rocks/moon_dmg_large1.png';

import mars from '../general/rocks/mars.png';
import marsSmall1 from '../general/rocks/mars_dmg_small1.png';
import marsSmall2 from '../general/rocks/mars_dmg_small2.png';
import marsMedium1 from '../general/rocks/mars_dmg_medium1.png';
import marsMedium2 from '../general/rocks/mars_dmg_medium2.png';
import marsLarge1 from '../general/rocks/mars_dmg_large1.png';

import jupiter from '../general/rocks/jupiter.png';
import jupiterSmall1 from '../general/rocks/jupiter_dmg_small1.png';
import jupiterSmall2 from '../general/rocks/jupiter_dmg_small2.png';
import jupiterMedium1 from '../general/rocks/jupiter_dmg_medium1.png';
import jupiterMedium2 from '../general/rocks/jupiter_dmg_medium2.png';
import jupiterLarge1 from '../general/rocks/jupiter_dmg_large1.png';

import titan from '../general/rocks/titan.png';
import titanSmall1 from '../general/rocks/titan_dmg_small1.png';
import titanSmall2 from '../general/rocks/titan_dmg_small2.png';
import titanMedium1 from '../general/rocks/titan_dmg_medium1.png';
import titanMedium2 from '../general/rocks/titan_dmg_medium2.png';
import titanLarge1 from '../general/rocks/titan_dmg_large1.png';

export const rockSprites = Utils.deepFreeze({
    earth: [earth, earthSmall1, earthSmall2, earthMedium1, earthMedium2, earthLarge1],
    moon: [moon, moonSmall1, moonSmall2, moonMedium1, moonMedium2, moonLarge1],
    mars: [mars, marsSmall1, marsSmall2, marsMedium1, marsMedium2, marsLarge1],
    jupiter: [jupiter, jupiterSmall1, jupiterSmall2, jupiterMedium1, jupiterMedium2, jupiterLarge1],
    titan: [titan, titanSmall1, titanSmall2, titanMedium1, titanMedium2, titanLarge1]
});

export const particleSprite = earthParticle;