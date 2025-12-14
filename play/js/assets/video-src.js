import { group, bundle, single } from './asset-loader-factory.js';

const groups = {};

const bundles = {};

import moonLaunchSrc from '../../assets/The Moon Launch.mp4';

const singles = {
    moonLaunch: single(moonLaunchSrc)
};

export const audioLoader = {
    groups: groups,
    bundles: bundles,
    singles: singles
};