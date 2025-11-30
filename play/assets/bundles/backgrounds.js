import { Utils } from '../../js/utils';

// Contains an export for each planet (and at some point, each holiday)

import bg1 from '../backgrounds/bg1.jpg';
import bg3 from '../backgrounds/bg3.jpg';
import bg4 from '../backgrounds/bg4.jpg';
import bg5 from '../backgrounds/bg5.jpg';
import bg6 from '../backgrounds/bg6.jpg';
import bg7 from '../backgrounds/bg7.jpg';
import bg9 from '../backgrounds/bg9.jpg';

import bg101 from '../backgrounds/bg101.jpg';
import bg102 from '../backgrounds/bg102.jpg';
import bg103 from '../backgrounds/bg103.jpg';
import bg104 from '../backgrounds/bg104.jpg';
import bg105 from '../backgrounds/bg105.jpg';

import bgNew from '../backgrounds/bg-new.jpg';

import bgjup01 from '../backgrounds/bgjup01.jpg';
import bgjup02 from '../backgrounds/bgjup02.jpg';
import bgjup03 from '../backgrounds/bgjup03.jpg';
import dogewow from '../backgrounds/dogewow.jpg';

import titan02 from '../backgrounds/titan02.jpg';
import titan03 from '../backgrounds/titan03.jpg';
import titan04 from '../backgrounds/titan04.jpg';
import titan05 from '../backgrounds/titan05.jpg';

export const backgroundSprites = Utils.deepFreeze({
    earth: [bg1, bg3, bg4, bg5, bg6, bg7, bg9, bgNew],
    moon: [bg1, bg3, bg4, bg5, bg6, bg7, bg9, bgNew], // Moon backgrounds (same as earth since DOM only has 8 background elements)
    mars: [bg6, bg101, bg102, bg103, bg104, bg105, bgNew],
    jupiter: [bgjup01, bgjup02, bgjup03, dogewow],
    titan: [titan02, titan03, titan04, titan05] // Titan uses its own background set for atmospheric effect
});