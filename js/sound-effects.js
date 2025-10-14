// Sound Effects System for CosmoDex
(function() {
    'use strict';
    
    // Audio context for sound generation
    let audioContext;
    let isSoundEnabled = true;
    
    // Initialize audio context
    function initAudioContext() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    // Create a beep sound
    function createBeep(frequency, duration, type = 'sine') {
        if (!isSoundEnabled || !audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Create visual success feedback
    function createSuccessVisual() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-animation';
        successDiv.innerHTML = '✓';
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            color: #10b981;
            z-index: 10002;
            animation: successBounce 1s ease-out;
            pointer-events: none;
        `;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 1000);
    }
    
    // Create confetti effect
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10001;
        `;
        document.body.appendChild(confettiContainer);
        
        // Create multiple confetti pieces
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${['#ffffff', '#e8e8e8', '#d0d0d0', '#b8b8b8', '#a0a0a0'][i % 5]};
                left: ${Math.random() * 100}%;
                animation: confettiFall 3s linear forwards;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            `;
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            confettiContainer.remove();
        }, 3000);
    }
    
    // Sound effects
    const sounds = {
        click: () => createBeep(800, 0.1, 'square'),
        hover: () => createBeep(600, 0.05, 'sine'),
        correct: () => {
            createBeep(523, 0.2, 'sine'); // C5
            setTimeout(() => createBeep(659, 0.2, 'sine'), 100); // E5
            setTimeout(() => createBeep(784, 0.3, 'sine'), 200); // G5
            // Add visual feedback
            createSuccessVisual();
        },
        incorrect: () => {
            createBeep(200, 0.3, 'sawtooth');
        },
        complete: () => {
            createBeep(523, 0.2, 'sine'); // C5
            setTimeout(() => createBeep(659, 0.2, 'sine'), 150); // E5
            setTimeout(() => createBeep(784, 0.2, 'sine'), 300); // G5
            setTimeout(() => createBeep(1047, 0.4, 'sine'), 450); // C6
            // Add confetti effect
            createConfetti();
        },
        levelUp: () => {
            createBeep(523, 0.2, 'sine'); // C5
            setTimeout(() => createBeep(659, 0.2, 'sine'), 100); // E5
            setTimeout(() => createBeep(784, 0.2, 'sine'), 200); // G5
            setTimeout(() => createBeep(1047, 0.2, 'sine'), 300); // C6
            setTimeout(() => createBeep(1319, 0.4, 'sine'), 400); // E6
        },
        notification: () => createBeep(1000, 0.15, 'triangle'),
        pageTransition: () => createBeep(400, 0.2, 'sine')
    };
    
    // Initialize on first user interaction
    function initOnInteraction() {
        initAudioContext();
        document.removeEventListener('click', initOnInteraction);
        document.removeEventListener('keydown', initOnInteraction);
    }
    
    // Add event listeners for initialization
    document.addEventListener('click', initOnInteraction);
    document.addEventListener('keydown', initOnInteraction);
    
    // Add sound effects to buttons and interactive elements
    function addSoundEffects() {
        // Button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn, .option, .planet, .profile-chip')) {
                sounds.click();
            }
        });
        
        // Button hovers
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches('button, .btn, .option, .planet, .profile-chip')) {
                sounds.hover();
            }
        }, true);
        
        // Page transitions
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href]')) {
                sounds.pageTransition();
            }
        });
    }
    
    // Toggle sound on/off
    function toggleSound() {
        isSoundEnabled = !isSoundEnabled;
        localStorage.setItem('cosmodex_sound_enabled', isSoundEnabled);
        return isSoundEnabled;
    }
    
    // Load sound preference
    function loadSoundPreference() {
        const saved = localStorage.getItem('cosmodex_sound_enabled');
        if (saved !== null) {
            isSoundEnabled = saved === 'true';
        }
    }
    
    // Initialize
    loadSoundPreference();
    addSoundEffects();
    
    // Export to global scope
    window.CosmoDexSounds = {
        ...sounds,
        toggle: toggleSound,
        isEnabled: () => isSoundEnabled
    };
})();
