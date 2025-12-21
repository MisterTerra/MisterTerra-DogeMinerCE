import gameManager from './game.js';
import uiManager from './ui.js';
import shopManager from './shop.js';
import saveManager from './save.js';
import audioManager from './audio.js';
import notificationManager from './notification.js';
import cloudSaveManager from './cloud-save.js';
import { backgroundImgs, characterImgs, platformImgs, rockImgs } from './assets/img-src.js';

// DogeMiner: Community Edition - Main Initialization
const startGameWhenReady = () => initializeGame();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startGameWhenReady);
} else {
    // Fallback loader inserts scripts after DOM is ready, so boot immediately in that case.
    startGameWhenReady();
}

// Prevent context menu on right click everywhere
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

async function initializeGame() {
    try {
        uiManager.showLoadingScreen();

        uiManager.updateLoadingInfo('Initializing game engine...');
        gameManager.init();

        uiManager.updateLoadingInfo('Setting up shop system...');
        shopManager.init();

        uiManager.updateLoadingInfo('Building user interface...');
        uiManager.init();

        uiManager.updateLoadingInfo('Loading audio system...');
        audioManager.init();

        uiManager.updateLoadingInfo('Initializing save system...');
        saveManager.init();

        uiManager.updateLoadingInfo('Preparing notifications...');
        notificationManager.init();

        uiManager.updateLoadingInfo('Setting up cloud save...');
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => { cloudSaveManager.init() });
        } else {
            cloudSaveManager.init();
        }

        uiManager.updateLoadingInfo('Loading game data...');

        /* TODO - does this play nicely with cloud-save?
        I think we should fetch local save (since fetching from localstore is essentially instant), then attempt to load from cloud save
        */
        // Try to load existing save
        const saveLoaded = saveManager.loadGame();
        if (!saveLoaded) {
            // No save found, start new game
            notificationManager.showInfo('Welcome to DogeMiner: Community Edition!');
        } else {
            // Make sure character sprite and rock are correctly set based on current level
            const mainCharacter = document.getElementById('main-character');
            const mainRock = document.getElementById('main-rock');
            const platform = document.getElementById('platform');

            if (mainCharacter && mainRock) {
                // Set correct character sprite
                if (gameManager.currentLevel === 'earth') {
                    document.body.classList.remove('moon-theme', 'planet-mars', 'planet-jupiter', 'planet-titan');

                } else if (gameManager.currentLevel === 'moon') {
                    document.body.classList.remove('planet-mars', 'planet-jupiter', 'planet-titan');

                    // Make sure moon is unlocked in UI
                    uiManager.hideMoonLocked();

                } else if (gameManager.currentLevel === 'mars') {
                    document.body.classList.remove('moon-theme', 'planet-jupiter', 'planet-titan');
                    document.body.classList.add('planet-mars');

                } else if (gameManager.currentLevel === 'jupiter') {
                    document.body.classList.remove('moon-theme', 'planet-mars', 'planet-titan');
                    document.body.classList.add('planet-jupiter');

                } else if (gameManager.currentLevel === 'titan') {
                    document.body.classList.remove('moon-theme', 'planet-mars', 'planet-jupiter');
                    document.body.classList.add('planet-titan');
                }

                if (platform) {
                    platform.src = platformImgs[gameManager.currentLevel];
                }

                gameManager.backgrounds = backgroundImgs[gameManager.currentLevel];
                
                mainRock.src = rockImgs[gameManager.currentLevel][0];

                mainCharacter.src = characterImgs[gameManager.currentLevel].open;
                
                // Make sure the background DOM nodes reflect the resolved pool for this load-in planet.
                gameManager.syncBackgroundImages?.(true);

                // Force update shop content and planet tabs if on Moon, Mars, Jupiter, or Titan
                if ((gameManager.currentLevel === 'moon' || gameManager.currentLevel === 'mars' || gameManager.currentLevel === 'jupiter' || gameManager.currentLevel === 'titan') && uiManager) {
                    uiManager.initializePlanetTabs?.();
                    setTimeout(() => {
                        uiManager.updateShopContent();
                    }, 100); // Short delay to ensure UI is ready
                }
            }
        }

        // CloudSaveManager will be initialized by cloud-save.js
        uiManager.updateLoadingInfo('Finalizing...');

        uiManager.updateLoadingInfo('Ready!');

        // Hide loading screen after a short delay
        setTimeout(() => {
            uiManager.hideLoadingScreen();
            gameManager.isPlaying = true;

            // Play doge intro animation
            if (gameManager.currentLevel === 'earth') {
                gameManager.playDogeIntro();
            } else {
                gameManager.playDogeIntro(true);
            }

            // Start background music only if enabled
            if (audioManager && gameManager && gameManager.musicEnabled) {
                audioManager.playBackgroundMusic();
            }

            notificationManager.showSuccess('Game loaded successfully!');
        }, 500);

    } catch (error) {
        console.error('Error initializing game:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        console.error('Error name:', error.name);
        uiManager.hideLoadingScreen();
        alert('Error initializing game: ' + (error.message || error.toString()) + '. Please check console and refresh.');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Toggle debug mode with Ctrl+\ ()
    if (e.ctrlKey && (e.key === '\\' || e.key === 'å')) {
        e.preventDefault();
        uiManager.toggleDebugMode();
    }

    // Quick save with Ctrl+S
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveManager.saveGame();
    }

    // Quick load with Ctrl+L
    if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        saveManager.loadGame();
    }

    // Toggle shop with S
    if (e.key === 's' && !e.ctrlKey) {
        uiManager.switchMainTab('shop');
    }

    // Toggle upgrades with U
    if (e.key === 'u') {
        uiManager.switchMainTab('upgrades');
    }

    // Toggle achievements with A
    if (e.key === 'a') {
        uiManager.switchMainTab('achievements');
    }

    // Rotate background with B
    if (e.key === 'b') {
        gameManager.rotateBackground();
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Game error:', e.error);
    console.error('Error message:', e.message);
    console.error('Error filename:', e.filename);
    console.error('Error line:', e.lineno, 'col:', e.colno);
    console.error('Full event:', e);

    if (notificationManager) {
        notificationManager.showError('An error occurred: ' + (e.message || 'Unknown error'));
    }
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    console.error('Promise:', e.promise);

    if (notificationManager) {
        notificationManager.showError('Promise error: ' + (e.reason?.message || e.reason));
    }
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}