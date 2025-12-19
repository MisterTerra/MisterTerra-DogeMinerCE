import { Howl, Howler } from 'https://cdn.jsdelivr.net/npm/howler@2.2.4/+esm'
import gameManager from './game.js';
import saveManager from './save.js';
import { mainAudio, musicAudio, pickAudio } from './assets/audio-src.js';
import { preloadAll } from './assets/asset-preload.js';

// DogeMiner: Community Edition - Audio Manager using Howler.js
class AudioManager {
    constructor() {
        this.musicEnabled = true;
        this.soundEnabled = true;
        this.currentTrack = null;
        this.introSound = null;
        this.loopSound = null;
        this.moonLoop = null;
        this.marsLoop = null;
        this.jupiterLoop = null;
        this.titanLoop = null;
        this.soundEffects = {};
        this.currentMusicPlanet = null;
    }

    init() {
        try {
            // Check if Howler.js is loaded
            if (typeof Howl === 'undefined') {
                console.error('Howler.js library not loaded! Audio will be disabled.');
                this.musicEnabled = false;
                this.soundEnabled = false;
                return;
            }

            try {
                // Load background music
                this.loadLevel1Music();
                this.loadMoonMusic();
                this.loadMarsMusic();
                this.loadJupiterMusic();
                this.loadTitanMusic();

                // Load sound effects
                this.loadSoundEffects();

                // Listen for settings changes
                this.setupSettingsListeners();
            } catch (error) {
                console.error('Error initializing audio:', error);
                console.error('Audio will be disabled');
                this.musicEnabled = false;
                this.soundEnabled = false;
            }
        } catch (error) {
            console.error('Failed to initialize audio manager:', error);
            console.warn('Game will continue without audio');
        }
    }

    loadSoundEffects() {
        // Load swipe sound for tab switching - paths adjusted for play/ directory serving
        this.soundEffects.swipe = new Howl({
            src: [mainAudio.swipe3],
            volume: 0.5
        });

        // Load ching sound for purchasing
        this.soundEffects.ching = new Howl({
            src: [mainAudio.ching],
            volume: 0.5
        });

        // Load uhoh sound for locked content
        this.soundEffects.uhoh = new Howl({
            src: [mainAudio.uhoh],
            volume: 0.5
        });

        // Load check sound for settings toggles
        this.soundEffects.check = new Howl({
            src: [mainAudio.check],
            volume: 0.5
        });

        // Load pick sounds for rock hitting
        this.soundEffects.pick = [];
        preloadAll(pickAudio).then(() => {
            pickAudio.forEach((src) => {
                this.soundEffects.pick.push(new Howl({
                    src: [src],
                    volume: 0.375  // 75% of 0.5
                }));
            });
        });
    }

    setupSettingsListeners() {
        // Listen for music setting changes
        const musicCheckbox = document.getElementById('music-enabled');
        if (musicCheckbox) {
            musicCheckbox.addEventListener('change', (e) => {
                this.musicEnabled = e.target.checked;
                // Sync with game settings
                gameManager.musicEnabled = e.target.checked;
                if (!this.musicEnabled) {
                    this.stopMusic();
                } else {
                    this.playBackgroundMusic();
                }
                // Play check sound
                this.playSound('check');
                // Trigger auto-save to save settings (don't show notification)
                saveManager.saveGame(false);
            });
        }

        // Listen for sound setting changes
        const soundCheckbox = document.getElementById('sound-enabled');
        if (soundCheckbox) {
            soundCheckbox.addEventListener('change', (e) => {
                this.soundEnabled = e.target.checked;
                // Sync with game settings
                gameManager.soundEnabled = e.target.checked;
                // Play check sound
                this.playSound('check');
                // Trigger auto-save to save settings (don't show notification)
                saveManager.saveGame(false);
            });
        }
    }

    loadLevel1Music() {
        // Create intro sound - path adjusted for play/ directory serving
        this.introSound = new Howl({
            src: [musicAudio.earth.intro],
            loop: false,
            autoplay: false,
            volume: 0.5,
            onend: () => {
                // When intro ends, play the loop
                if (this.musicEnabled) {
                    this.loopSound.play();
                }
            }
        });

        // Create loop sound - path adjusted for play/ directory serving
        this.loopSound = new Howl({
            src: [musicAudio.earth.loop],
            loop: true,
            autoplay: false,
            volume: 0.5
        });
    }

    loadMoonMusic() {
        this.moonLoop = new Howl({
            src: [musicAudio.moon.loop],
            loop: true,
            autoplay: false,
            volume: 0.5
        });
    }

    loadMarsMusic() {
        this.marsLoop = new Howl({
            src: [musicAudio.mars.loop],
            loop: true,
            autoplay: false,
            volume: 0.5
        });
    }

    loadJupiterMusic() {
        this.jupiterLoop = new Howl({
            src: [musicAudio.jupiter.loop],
            loop: true,
            autoplay: false,
            volume: 0.5
        });
    }

    loadTitanMusic() {
        this.titanLoop = new Howl({
            src: [musicAudio.titan.loop],
            loop: true,
            autoplay: false,
            volume: 0.5
        });
    }

    isPlaying(sound) {
        return !!(sound && typeof sound.playing === 'function' && sound.playing());
    }

    playBackgroundMusic() {
        if (!this.musicEnabled) return;

        const currentLevel = gameManager.currentLevel || 'earth';

        if (this.currentMusicPlanet === currentLevel) {
            if (currentLevel === 'moon' && this.isPlaying(this.moonLoop)) {
                return;
            }
            if (currentLevel === 'mars' && this.isPlaying(this.marsLoop)) {
                return;
            }
            if (currentLevel === 'jupiter' && this.isPlaying(this.jupiterLoop)) {
                return;
            }
            if (currentLevel === 'titan' && this.isPlaying(this.titanLoop)) {
                return;
            }
            if (currentLevel === 'earth' && (this.isPlaying(this.introSound) || this.isPlaying(this.loopSound))) {
                return;
            }
        }

        // Stop any currently playing music
        this.stopMusic();

        this.currentMusicPlanet = currentLevel;

        if (currentLevel === 'moon') {
            if (this.moonLoop) {
                this.moonLoop.play();
            }
        } else if (currentLevel === 'mars') {
            if (this.marsLoop) {
                this.marsLoop.play();
            }
        } else if (currentLevel === 'jupiter') {
            // Jupiter uses its own atmospheric music track
            if (this.jupiterLoop) {
                this.jupiterLoop.play();
            }
        } else if (currentLevel === 'titan') {
            // Titan uses ambient soundscape music
            if (this.titanLoop) {
                this.titanLoop.play();
            }
        } else {
            // Play intro first, then loop (Earth)
            if (this.introSound) {
                this.introSound.play();
            }
        }
    }

    stopMusic() {
        if (this.introSound) {
            this.introSound.stop();
        }
        if (this.loopSound) {
            this.loopSound.stop();
        }
        if (this.moonLoop) {
            this.moonLoop.stop();
        }
        if (this.marsLoop) {
            this.marsLoop.stop();
        }
        if (this.jupiterLoop) {
            this.jupiterLoop.stop();
        }
        if (this.titanLoop) {
            this.titanLoop.stop();
        }
        this.currentMusicPlanet = null;
    }

    setMusicVolume(volume) {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        if (this.introSound) {
            this.introSound.volume(clampedVolume);
        }
        if (this.loopSound) {
            this.loopSound.volume(clampedVolume);
        }
        if (this.moonLoop) {
            this.moonLoop.volume(clampedVolume);
        }
        if (this.marsLoop) {
            this.marsLoop.volume(clampedVolume);
        }
        if (this.jupiterLoop) {
            this.jupiterLoop.volume(clampedVolume);
        }
        if (this.titanLoop) {
            this.titanLoop.volume(clampedVolume);
        }
    }

    setSoundVolume(volume) {
        // Store volume for future sound effects
        this.soundVolume = Math.max(0, Math.min(1, volume));
    }

    // Play a sound effect
    playSound(soundName, options = {}) {
        if (!this.soundEnabled) return;

        const sound = this.soundEffects[soundName];
        if (sound) {
            // If it's an array (like pick sounds), pick a random one
            if (Array.isArray(sound)) {
                const randomIndex = Math.floor(Math.random() * sound.length);
                sound[randomIndex].play();
            } else {
                sound.play();
            }
        }
    }

    suspendAllAudio() {
        this._wasMusicEnabled = this.musicEnabled;
        this._wasSoundEnabled = this.soundEnabled;
        this.stopMusic();
        this.musicEnabled = false;
        this.soundEnabled = false;
        this.stopAllSoundEffects();
    }

    resumeAudio() {
        if (typeof this._wasMusicEnabled === 'boolean') {
            this.musicEnabled = this._wasMusicEnabled;
        }
        if (typeof this._wasSoundEnabled === 'boolean') {
            this.soundEnabled = this._wasSoundEnabled;
        }
        delete this._wasMusicEnabled;
        delete this._wasSoundEnabled;
        if (this.musicEnabled) {
            this.playBackgroundMusic();
        }
    }

    stopAllSoundEffects() {
        Object.values(this.soundEffects).forEach(effect => {
            if (Array.isArray(effect)) {
                effect.forEach(sound => {
                    if (sound && typeof sound.stop === 'function') {
                        sound.stop();
                    }
                });
            } else if (effect && typeof effect.stop === 'function') {
                effect.stop();
            }
        });
    }
}

const instance = new AudioManager();
export default instance;