import { Utils } from '../../play/js/utils';

import earthIntro from '../SoundsSrc/musiclevel1/music_intro.mp3';
import earthLoop from '../SoundsSrc/musiclevel1/music.mp3';

import moonLoop from '../SoundsSrc/musiclevel2/music.mp3';
import marsLoop from '../SoundsSrc/musiclevel3/music.mp3';
import jupiterLoop from '../SoundsSrc/musiclevel4/music.mp3';
import titanLoop from '../SoundsSrc/musiclevel5/compiled/audiosprite_level5.mp3';

console.log('Type of moonLoop: ' + typeof moonLoop, moonLoop);

export const soundSrcMusic = Utils.deepFreeze({
    earth: {intro: earthIntro, loop: earthLoop},
    moon: {loop: moonLoop},
    mars: {loop: marsLoop},
    jupiter: {loop: jupiterLoop},
    titan: {loop: titanLoop},
});