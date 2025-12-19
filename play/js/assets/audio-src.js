import { normalizeModules } from "./asset-utils";

const musicModules = normalizeModules(import.meta.glob('../../assets/audio/music/*.wav', { eager: true, import: 'default' }));
export const musicAudio = {
    earth:   { loop: musicModules.level1Loop, intro: musicModules.level1Intro },
    moon:    { loop: musicModules.level2Loop },
    mars:    { loop: musicModules.level3Loop },
    jupiter: { loop: musicModules.level4Loop },
    titan:   { loop: musicModules.level5Loop },
}

const pickModules = normalizeModules(import.meta.glob('../../assets/audio/main/pick/*.wav', { eager: true, import: 'default' }));
export const pickAudio = ['pick1', 'pick2', 'pick3', 'pick4', 'pick5', 'pick6'].map(k => pickModules[k]);

const mainModules = normalizeModules('../../assets/audio/main/*.wav', {eager: true, import: 'default'});
export const mainAudio = {
    uhoh:   mainModules.uhoh,
    swipe3: mainModules.swipe3,
    check:  mainModules.check,
    ching:  mainModules.ching,
};
