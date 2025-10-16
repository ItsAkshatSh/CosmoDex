// Solar System Carousel - Realistic Planet Orbits (Improved)
(function() {
    const solarSystem = document.getElementById('solar-system');
    const systemInfo = document.getElementById('system-info');
    
    if (!solarSystem) return;
    
    let currentSystem = 0; // 0: Beginner, 1: Intermediate, 2: Advanced
    let isRotating = false;
    let rotationTimeout;
    let animationId;
    
    const systems = [
        {
            name: 'Beginner Solar System',
            description: 'Explore our home solar system and learn about planets',
            stats: { paths: 9, lessons: 45 },
            color: '#22d3ee',
            unlocked: true
        },
        {
            name: 'Intermediate System',
            description: 'Dive deeper into advanced space science concepts',
            stats: { paths: 0, lessons: 0 },
            color: '#666666',
            unlocked: false
        },
        {
            name: 'Advanced System',
            description: 'Master the most complex space exploration topics',
            stats: { paths: 0, lessons: 0 },
            color: '#666666',
            unlocked: false
        }
    ];
    
// Planet data for the solar system - much bigger and more spaced out with colors and emojis
const planets = [
    { name: 'Mercury', image: 'planet_mercury.png', distance: 140, size: 32, speed: 0.02, color: '#8c7853', emoji: '☿️', description: 'The smallest planet, closest to the Sun' },
    { name: 'Venus', image: 'planet_venus.png', distance: 200, size: 38, speed: 0.015, color: '#ffc649', emoji: '♀️', description: 'The hottest planet with thick clouds' },
    { name: 'Earth', image: 'planet_earth.png', distance: 260, size: 42, speed: 0.01, color: '#6b93d6', emoji: '🌍', description: 'Our home planet, the only known planet with life' },
    { name: 'Mars', image: 'planet_mars.png', distance: 320, size: 36, speed: 0.008, color: '#c1440e', emoji: '♂️', description: 'The Red Planet, future home of humanity' },
    { name: 'Jupiter', image: 'planet_jupiter.png', distance: 420, size: 70, speed: 0.005, color: '#d8ca9d', emoji: '♃', description: 'The largest planet, a gas giant with a Great Red Spot' },
    { name: 'Saturn', image: 'planet_saturn_fullring.png', distance: 520, size: 65, speed: 0.003, color: '#fad5a5', emoji: '♄', description: 'Famous for its beautiful ring system' },
    { name: 'Uranus', image: 'planet_uranus_fullring.png', distance: 620, size: 50, speed: 0.002, color: '#4fd0e7', emoji: '♅', description: 'An ice giant that rotates on its side' },
    { name: 'Neptune', image: 'planet_neptune.png', distance: 720, size: 50, speed: 0.001, color: '#4b70dd', emoji: '♆', description: 'The windiest planet with supersonic winds' },
    { name: 'Pluto', image: 'planet_pluto.png', distance: 820, size: 28, speed: 0.0008, color: '#c9b037', emoji: '♇', description: 'A dwarf planet in the Kuiper Belt' }
];
    
    // Update system info panel
    function updateSystemInfo() {
        const system = systems[currentSystem];
        if (!systemInfo) return;
        
        const title = systemInfo.querySelector('.system-title');
        const description = systemInfo.querySelector('.system-description');
        const statNumbers = systemInfo.querySelectorAll('.stat-number');
        const statLabels = systemInfo.querySelectorAll('.stat-label');
        
        if (title) {
            title.textContent = system.name;
            title.style.color = system.color;
        }
        
        if (description) {
            if (system.unlocked) {
                description.textContent = system.description;
            } else {
                description.textContent = '🔒 Complete Beginner System to unlock this level';
            }
        }
        
        if (statNumbers[0]) statNumbers[0].textContent = system.stats.paths;
        if (statNumbers[1]) statNumbers[1].textContent = system.stats.lessons;
        
        // Add lock indicator for locked systems
        if (!system.unlocked) {
            systemInfo.classList.add('locked');
        } else {
            systemInfo.classList.remove('locked');
        }
    }
    
    // Create planet elements
    function createPlanets() {
        const sun = solarSystem.querySelector('.sun');
        if (!sun) return;
        
        // Clear existing planets
        const existingPlanets = solarSystem.querySelectorAll('.planet, .orbit-path');
        existingPlanets.forEach(el => el.remove());
        
        // Only create planets for unlocked systems
        if (!systems[currentSystem].unlocked) {
            return;
        }
        
        planets.forEach((planet, index) => {
            const planetElement = document.createElement('div');
            planetElement.className = 'planet';
            planetElement.dataset.planet = planet.name.toLowerCase();
            planetElement.style.cssText = `
                position: absolute;
                width: ${planet.size}px;
                height: ${planet.size}px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 5;
            `;
            
            const planetCore = document.createElement('div');
            planetCore.className = 'planet-core';
            planetCore.style.cssText = `
                width: 100%;
                height: 100%;
                background-image: url('Badges/${planet.image}');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 0 8px ${planet.color}40;
            `;
            
            const planetLabel = document.createElement('div');
            planetLabel.className = 'planet-label';
            planetLabel.textContent = planet.name;
            planetLabel.style.cssText = `
                position: absolute;
                top: -35px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 6px 12px;
                border-radius: 16px;
                font-size: 0.8rem;
                font-weight: 600;
                white-space: nowrap;
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
                border: 1px solid ${planet.color};
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
            `;
            
            // Add orbital path indicator
            const orbitPath = document.createElement('div');
            orbitPath.className = 'orbit-path';
            orbitPath.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: ${planet.distance * 2}px;
                height: ${planet.distance * 2}px;
                border: 1px solid ${planet.color}20;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 1;
            `;
            
            planetElement.appendChild(planetCore);
            planetElement.appendChild(planetLabel);
            solarSystem.appendChild(orbitPath);
            solarSystem.appendChild(planetElement);
            
            // Add hover effects
            planetElement.addEventListener('mouseenter', () => {
                planetLabel.style.opacity = '1';
                planetLabel.style.transform = 'translateX(-50%) translateY(-5px)';
                planetCore.style.transform = 'scale(1.3)';
                planetCore.style.boxShadow = `0 0 20px ${planet.color}80`;
                orbitPath.style.borderColor = planet.color + '60';
            });
            
            planetElement.addEventListener('mouseleave', () => {
                planetLabel.style.opacity = '0';
                planetLabel.style.transform = 'translateX(-50%) translateY(0px)';
                planetCore.style.transform = 'scale(1)';
                planetCore.style.boxShadow = `0 0 8px ${planet.color}40`;
                orbitPath.style.borderColor = planet.color + '20';
            });
            
            // Add click handler
            planetElement.addEventListener('click', (e) => {
                e.stopPropagation();
                showPlanetDialog(planet);
            });
        });
    }
    
    // Mouse tracking for parallax effect
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    // Animate planets in orbit with mouse parallax effect
    function animatePlanets() {
        const planetElements = solarSystem.querySelectorAll('.planet');
        let angle = 0;
        
        function updatePositions() {
            planetElements.forEach((planetElement, index) => {
                const planet = planets[index];
                
                // Base orbital position
                const baseX = Math.cos(angle * planet.speed) * planet.distance;
                const baseY = Math.sin(angle * planet.speed) * planet.distance;
                
                // Mouse parallax effect (stronger for inner planets)
                const parallaxStrength = (1 - (index / planets.length)) * 0.3; // Inner planets move more
                const parallaxX = targetMouseX * parallaxStrength;
                const parallaxY = targetMouseY * parallaxStrength;
                
                const finalX = baseX + parallaxX;
                const finalY = baseY + parallaxY;
                
                planetElement.style.transform = `translate(calc(-50% + ${finalX}px), calc(-50% + ${finalY}px))`;
            });
                angle += 0.05; // Even slower rotation for easier clicking
            animationId = requestAnimationFrame(updatePositions);
        }
        
        updatePositions();
    }
    
    // Smooth mouse tracking
    function updateMousePosition() {
        targetMouseX += (mouseX - targetMouseX) * 0.1;
        targetMouseY += (mouseY - targetMouseY) * 0.1;
        requestAnimationFrame(updateMousePosition);
    }
    
    updateMousePosition();
    
    // Don't pause animation - let planets keep moving for better experience
    function setupPauseOnHover() {
        // Removed pause functionality to keep planets moving smoothly
        // This allows mouse parallax to work continuously
    }
    
    // Show planet dialog with color coding and emojis
    function showPlanetDialog(planet) {
        // Remove existing dialog if any
        const existingDialog = document.querySelector('.planet-dialog');
        if (existingDialog) {
            existingDialog.remove();
        }
        
        // Create dialog overlay
        const overlay = document.createElement('div');
        overlay.className = 'planet-dialog-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;
        
        // Create dialog box
        const dialog = document.createElement('div');
        dialog.className = 'planet-dialog';
        dialog.style.cssText = `
            background: rgba(255, 255, 255, 0.03);
            border: 2px solid ${planet.color};
            border-radius: 20px;
            padding: 2rem;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        
        dialog.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 1rem;">${planet.emoji}</div>
            <h2 style="color: ${planet.color}; font-size: 2rem; margin-bottom: 1rem; text-shadow: 0 0 10px ${planet.color}50;">${planet.name}</h2>
            <p style="color: #8a8a8a; margin-bottom: 2rem; line-height: 1.5;">${planet.description}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="planet-dialog-btn" style="
                    background: ${planet.color};
                    color: white;
                    border: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                ">Start Learning</button>
                <button class="planet-dialog-close" style="
                    background: rgba(255, 255, 255, 0.1);
                    color: #8a8a8a;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 0.8rem 1.5rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                ">Close</button>
            </div>
        `;
        
        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
        
        // Animate in
        setTimeout(() => {
            dialog.style.transform = 'scale(1)';
        }, 10);
        
        // Add event listeners
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeDialog();
            }
        });
        
        dialog.querySelector('.planet-dialog-close').addEventListener('click', closeDialog);
        dialog.querySelector('.planet-dialog-btn').addEventListener('click', () => {
            console.log(`Starting ${planet.name} learning path!`);
            closeDialog();
            
            // Navigate to course page based on planet
            if (planet.name === 'Mercury') {
                window.location.href = 'mercury-course.html';
            } else {
                // For other planets, show coming soon message
                setTimeout(() => {
                    alert(`${planet.name} course coming soon! Start with Mercury to learn the basics.`);
                }, 300);
            }
        });
        
        function closeDialog() {
            dialog.style.transform = 'scale(0.9)';
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    }

    // Navigate to specific planet
    function navigateToPlanet(planetName) {
        console.log(`Navigating to ${planetName} learning path!`);
        
        // Create a beautiful modal for planet selection
        const modal = document.createElement('div');
        modal.className = 'planet-modal';
        modal.innerHTML = `
            <div class="planet-modal-content">
                <div class="planet-modal-header">
                    <h2>🌍 ${planetName}</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="planet-modal-body">
                    <p>Ready to explore ${planetName}? This would take you to the ${planetName} learning path with interactive lessons, facts, and activities!</p>
                    <div class="planet-modal-actions">
                        <button class="btn btn-primary start-learning">Start Learning</button>
                        <button class="btn btn-secondary close-modal">Maybe Later</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .planet-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            .planet-modal-content {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                padding: 2rem;
                max-width: 500px;
                text-align: center;
                backdrop-filter: blur(10px);
                animation: slideUp 0.3s ease;
            }
            .planet-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            .planet-modal-header h2 {
                margin: 0;
                color: #22d3ee;
                font-size: 1.8rem;
            }
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .planet-modal-body p {
                color: rgba(255, 255, 255, 0.9);
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            .planet-modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            .btn {
                padding: 12px 24px;
                border-radius: 25px;
                border: none;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            }
            .btn-primary {
                background: #22d3ee;
                color: #0d0d0d;
            }
            .btn-primary:hover {
                background: #06b6d4;
                transform: translateY(-2px);
            }
            .btn-secondary {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
            }
            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        const closeModal = () => {
            modal.remove();
            style.remove();
        };
        
        modal.querySelector('.close-btn').addEventListener('click', closeModal);
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        modal.querySelector('.start-learning').addEventListener('click', () => {
            alert(`🚀 Starting ${planetName} learning path! (This would navigate to the actual content)`);
            closeModal();
        });
    }
    
    // Rotate to specific system
    function rotateToSystem(systemIndex) {
        if (isRotating || systemIndex === currentSystem) return;
        
        isRotating = true;
        currentSystem = systemIndex;
        
        // Add rotation class for smooth transition
        solarSystem.classList.add('rotating');
        
        // Update system info and recreate planets
        updateSystemInfo();
        
        // Clear existing planets first
        const existingPlanets = solarSystem.querySelectorAll('.planet, .orbit-path');
        existingPlanets.forEach(el => el.remove());
        
        // Recreate planets for the new system
        createPlanets();
        
        // Restart animation if planets were created
        if (systems[currentSystem].unlocked) {
            animatePlanets();
        }
        
        // Remove rotation class after animation
        setTimeout(() => {
            solarSystem.classList.remove('rotating');
            isRotating = false;
        }, 800);
    }
    
    // Click navigation zones
    function setupClickNavigation() {
        const container = solarSystem.parentElement;
        const leftZone = document.createElement('div');
        const rightZone = document.createElement('div');
        
        leftZone.className = 'nav-zone nav-zone-left';
        rightZone.className = 'nav-zone nav-zone-right';
        
        container.appendChild(leftZone);
        container.appendChild(rightZone);
        
        // Left click - go to previous system
        leftZone.addEventListener('click', () => {
            if (isRotating) return;
            const prevSystem = currentSystem > 0 ? currentSystem - 1 : systems.length - 1;
            rotateToSystem(prevSystem);
        });
        
        // Right click - go to next system
        rightZone.addEventListener('click', () => {
            if (isRotating) return;
            const nextSystem = currentSystem < systems.length - 1 ? currentSystem + 1 : 0;
            rotateToSystem(nextSystem);
        });
        
        // Add enhanced hover effects for navigation zones
        [leftZone, rightZone].forEach(zone => {
            zone.addEventListener('mouseenter', () => {
                zone.style.opacity = '1';
                zone.style.transform = 'scale(1.1)';
            });
            zone.addEventListener('mouseleave', () => {
                zone.style.opacity = '0';
                zone.style.transform = 'scale(1)';
            });
        });
    }
    
    // Keyboard navigation
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    const prevSystem = currentSystem > 0 ? currentSystem - 1 : systems.length - 1;
                    rotateToSystem(prevSystem);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    const nextSystem = currentSystem < systems.length - 1 ? currentSystem + 1 : 0;
                    rotateToSystem(nextSystem);
                    break;
            }
        });
    }
    
    // Mouse movement tracking
    function setupMouseTracking() {
        const container = solarSystem.parentElement;
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Normalize mouse position relative to center (-1 to 1)
            mouseX = (e.clientX - rect.left - centerX) / centerX;
            mouseY = (e.clientY - rect.top - centerY) / centerY;
        });
        
        container.addEventListener('mouseleave', () => {
            // Reset to center when mouse leaves
            mouseX = 0;
            mouseY = 0;
        });
    }
    
    // Initialize the carousel
    function init() {
        updateSystemInfo();
        createPlanets();
        animatePlanets();
        setupPauseOnHover();
        setupClickNavigation();
        setupKeyboardNavigation();
        setupMouseTracking();
        
        // Add CSS for navigation zones with cool animations
        const style = document.createElement('style');
        style.textContent = `
            .nav-zone {
                position: absolute;
                top: 0;
                bottom: 0;
                width: 150px;
                z-index: 20;
                cursor: pointer;
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                color: rgba(255, 255, 255, 0.4);
                background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.1), transparent);
                backdrop-filter: blur(5px);
            }
            .nav-zone-left {
                left: 0;
                background: linear-gradient(90deg, rgba(34, 211, 238, 0.1), transparent);
            }
            .nav-zone-left::before {
                content: '←';
                text-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
                transition: all 0.3s ease;
            }
            .nav-zone-right {
                right: 0;
                background: linear-gradient(270deg, rgba(34, 211, 238, 0.1), transparent);
            }
            .nav-zone-right::before {
                content: '→';
                text-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
                transition: all 0.3s ease;
            }
            .nav-zone:hover {
                opacity: 1;
                color: rgba(34, 211, 238, 1);
                transform: scale(1.1);
            }
            .nav-zone:hover::before {
                text-shadow: 0 0 30px rgba(34, 211, 238, 0.8);
                transform: scale(1.2);
            }
            .nav-zone:active {
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Start the carousel
    init();
})();
