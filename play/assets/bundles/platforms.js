import { Utils } from '../../js/utils';

import moonPlatform from '../quickUI/dogeplatformmoon.png';
import marsPlatform from '../quickUI/marsdogeplatform.png';
import jupiterPlatform from '../quickUI/jupiterdogeplatform.png';
import titanPlatform from '../quickUI/titandogeplatform.png';

export const platformSprites = Utils.deepFreeze({
    moon: moonPlatform,
    mars: marsPlatform,
    jupiter: jupiterPlatform,
    titan: titanPlatform
});