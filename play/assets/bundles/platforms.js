import { Utils } from '../../js/utils';

import earthPlatform from '../quickUI/dogeplatform.png';
import moonPlatform from '../quickUI/dogeplatformmoon.png';
import marsPlatform from '../quickUI/marsdogeplatform.png';
import jupiterPlatform from '../quickUI/jupiterdogeplatform.png';
import titanPlatform from '../quickUI/titandogeplatform.png';

export const platformSprites = Utils.deepFreeze({
    earth: earthPlatform,
    moon: moonPlatform,
    mars: marsPlatform,
    jupiter: jupiterPlatform,
    titan: titanPlatform
});