// Theme Controls (Volume & Transparency)
class ThemeControls {
    constructor() {
        this.init();
    }

    init() {
        this.createControls();
        this.setupEventListeners();
    }

    createControls() {
        const controlsHTML = `
            <div class="theme-controls">
                <div class="control-group">
                    <svg class="control-icon" id="volumeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                    </svg>
                    <input type="range" id="volumeSlider" class="control-slider" min="0" max="1" step="0.1" value="0.3">
                </div>
                
                <div class="control-group">
                    <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <input type="range" id="transparencySlider" class="control-slider" min="0" max="1" step="0.1" value="0.4">
                </div>
            </div>
        `;

        // Only add to profile pages
        if (document.querySelector('.profile-card')) {
            document.body.insertAdjacentHTML('beforeend', controlsHTML);
        }
    }

    setupEventListeners() {
        const volumeSlider = document.getElementById('volumeSlider');
        const volumeIcon = document.getElementById('volumeIcon');
        const transparencySlider = document.getElementById('transparencySlider');

        if (!volumeSlider || !transparencySlider) return;

        // Volume control
        volumeSlider.addEventListener('input', (e) => {
            const volume = parseFloat(e.target.value);
            const bgVideo = document.getElementById('bgVideo');
            if (bgVideo) {
                bgVideo.volume = volume;
                bgVideo.muted = volume === 0;
            }

            // Update icon
            if (volume === 0 && volumeIcon) {
                volumeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>';
            } else if (volumeIcon) {
                volumeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>';
            }
        });

        // Transparency control
        transparencySlider.addEventListener('input', (e) => {
            const opacity = parseFloat(e.target.value);
            const profileCard = document.querySelector('.profile-card');

            if (profileCard) {
                if (opacity === 0) {
                    profileCard.style.background = 'rgba(0, 0, 0, 0)';
                    profileCard.style.backdropFilter = 'none';
                    profileCard.style.borderColor = 'transparent';
                } else {
                    profileCard.style.background = `rgba(10, 10, 10, ${opacity})`;
                    profileCard.style.backdropFilter = `blur(${30 * opacity}px) saturate(180%)`;
                    profileCard.style.borderColor = `rgba(255, 255, 255, ${0.06 * opacity})`;
                }
            }
        });
    }
}

// Add CSS for controls
const controlsCSS = `
.theme-controls {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 0.75rem 1.5rem;
    display: flex;
    gap: 2rem;
    z-index: 100;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.control-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.control-icon {
    width: 20px;
    height: 20px;
    color: var(--accent-color, #a855f7);
}

.control-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 80px;
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(to right, var(--accent-color, #a855f7), rgba(236, 72, 153, 0.8));
    outline: none;
    cursor: pointer;
}

.control-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: white;
    cursor: grab;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.control-slider::-webkit-slider-thumb:active {
    cursor: grabbing;
}

@media (max-width: 768px) {
    .theme-controls {
        bottom: 1rem;
        padding: 0.5rem 1rem;
        gap: 1rem;
    }
    
    .control-slider {
        width: 60px;
    }
    
    .control-icon {
        width: 16px;
        height: 16px;
    }
}
`;

const style = document.createElement('style');
style.textContent = controlsCSS;
document.head.appendChild(style);

// Initialize controls - DISABLED by user request
/*
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeControls();
    });
} else {
    new ThemeControls();
}
*/
