import level1Intro from "../../assets/audio/music/level1_intro.wav";
import level1Loop from  "../../assets/audio/music/level1.wav";
import level2Loop from  "../../assets/audio/music/level2.wav";
import level3Loop from  "../../assets/audio/music/level3.wav";
import level4Loop from  "../../assets/audio/music/level4.wav";
import level5Loop from  "../../assets/audio/music/level5.wav";

import pick1 from "../../assets/audio/main/pick/pick1.wav";
import pick2 from "../../assets/audio/main/pick/pick2.wav";
import pick3 from "../../assets/audio/main/pick/pick3.wav";
import pick4 from "../../assets/audio/main/pick/pick4.wav";
import pick5 from "../../assets/audio/main/pick/pick5.wav";
import pick6 from "../../assets/audio/main/pick/pick6.wav";

import uhoh from   "../../assets/audio/main/uhoh.wav";
import swipe3 from "../../assets/audio/main/swipe3.wav";
import check from  "../../assets/audio/main/check.wav";
import ching from  "../../assets/audio/main/ching.wav";

export const audioSrc = {
    music: {
        earth:   { loop: level1Loop, intro: level1Intro },
        moon:    { loop: level2Loop },
        mars:    { loop: level3Loop },
        jupiter: { loop: level4Loop },
        titan:   { loop: level5Loop },
    },

    pick: [pick1, pick2, pick3, pick4, pick5, pick6],

    uhoh:   uhoh,
    swipe3: swipe3,
    check:  check,
    ching:  ching,
};
