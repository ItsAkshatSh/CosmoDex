const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('stars-canvas'),
    alpha: true 
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
camera.position.z = 5;

const starsGeometry = new THREE.BufferGeometry();
const starCount = 3000;
const positions = new Float32Array(starCount * 3);
const colors = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100;
    positions[i + 1] = (Math.random() - 0.5) * 100;
    positions[i + 2] = (Math.random() - 0.5) * 100;

    const color = Math.random();
    if (color > 0.7) {
        colors[i] = 0.4 + Math.random() * 0.6;
        colors[i + 1] = 0.5 + Math.random() * 0.5;
        colors[i + 2] = 1;
    } else {
        colors[i] = 1;
        colors[i + 1] = 1;
        colors[i + 2] = 1;
    }
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const starsMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

function createPixelRocket() {
    const rocketGeometry = new THREE.BufferGeometry();
    const rocketCount = 55;
    const positions = new Float32Array(rocketCount * 3);
    const colors = new Float32Array(rocketCount * 3);

    const rocketPixels = [
        
        { x: 0, y: 0.4, color: [0, 0.4, 0.4] },
        { x: -0.1, y: 0.3, color: [0, 0.4, 0.4] },
        { x: 0, y: 0.3, color: [0, 0.4, 0.4] },
        { x: 0.1, y: 0.3, color: [0, 0.4, 0.4] },
        { x: -0.1, y: 0.2, color: [0, 0.4, 0.4] },
        { x: 0, y: 0.2, color: [0, 0.4, 0.4] },
        { x: 0.1, y: 0.2, color: [0, 0.4, 0.4] },

       
        { x: -0.1, y: 0.1, color: [1, 1, 1] },
        { x: 0, y: 0.1, color: [1, 1, 1] },
        { x: 0.1, y: 0.1, color: [1, 1, 1] },
        { x: -0.1, y: 0, color: [1, 1, 1] },
        { x: 0, y: 0, color: [1, 1, 1] },
        { x: 0.1, y: 0, color: [1, 1, 1] },
        { x: -0.1, y: -0.1, color: [1, 1, 1] },
        { x: 0, y: -0.1, color: [1, 1, 1] },
        { x: 0.1, y: -0.1, color: [1, 1, 1] },
        { x: -0.1, y: -0.2, color: [1, 1, 1] },
        { x: 0, y: -0.2, color: [1, 1, 1] },
        { x: 0.1, y: -0.2, color: [1, 1, 1] },

        
        { x: -0.1, y: -0.3, color: [1, 1, 1] },
        { x: 0, y: -0.3, color: [1, 1, 1] },
        { x: 0.1, y: -0.3, color: [1, 1, 1] },
        { x: -0.1, y: -0.4, color: [1, 1, 1] },
        { x: 0, y: -0.4, color: [1, 1, 1] },
        { x: 0.1, y: -0.4, color: [1, 1, 1] },
        { x: -0.1, y: -0.5, color: [1, 1, 1] },
        { x: 0, y: -0.5, color: [1, 1, 1] },
        { x: 0.1, y: -0.5, color: [1, 1, 1] },

        
        { x: -0.2, y: -0.3, color: [0, 0.4, 0.4] },
        { x: -0.3, y: -0.3, color: [0, 0.4, 0.4] },
        { x: -0.2, y: -0.4, color: [0, 0.4, 0.4] },
        { x: -0.3, y: -0.4, color: [0, 0.4, 0.4] },
        { x: -0.2, y: -0.5, color: [0, 0.4, 0.4] },
        { x: -0.3, y: -0.5, color: [0, 0.4, 0.4] },
        { x: -0.2, y: -0.6, color: [0, 0.4, 0.4] },
        { x: -0.3, y: -0.6, color: [0, 0.4, 0.4] },

        
        { x: 0.2, y: -0.3, color: [0, 0.4, 0.4] },
        { x: 0.3, y: -0.3, color: [0, 0.4, 0.4] },
        { x: 0.2, y: -0.4, color: [0, 0.4, 0.4] },
        { x: 0.3, y: -0.4, color: [0, 0.4, 0.4] },
        { x: 0.2, y: -0.5, color: [0, 0.4, 0.4] },
        { x: 0.3, y: -0.5, color: [0, 0.4, 0.4] },
        { x: 0.2, y: -0.6, color: [0, 0.4, 0.4] },
        { x: 0.3, y: -0.6, color: [0, 0.4, 0.4] },

        
        { x: -0.05, y: -0.6, color: [0.2, 0.2, 0.2] },
        { x: 0.05, y: -0.6, color: [0.2, 0.2, 0.2] },
        { x: -0.05, y: -0.7, color: [0.2, 0.2, 0.2] },
        { x: 0.05, y: -0.7, color: [0.2, 0.2, 0.2] },

       
        { x: -0.02, y: 0.05, color: [0.8, 0.8, 0.8] },
        { x: 0, y: 0.05, color: [0.8, 0.8, 0.8] },
        { x: 0.02, y: 0.05, color: [0.8, 0.8, 0.8] },
        { x: -0.02, y: 0, color: [0.8, 0.8, 0.8] },
        { x: 0, y: 0, color: [0.8, 0.8, 0.8] },
        { x: 0.02, y: 0, color: [0.8, 0.8, 0.8] },
        { x: -0.03, y: 0.08, color: [0.8, 0.8, 0.8] },
        { x: -0.04, y: 0.09, color: [0.8, 0.8, 0.8] },
        { x: 0.03, y: 0.08, color: [0.8, 0.8, 0.8] },
        { x: 0.04, y: 0.09, color: [0.8, 0.8, 0.8] },
    ];

    for (let i = 0; i < rocketCount; i++) {
        const pixel = rocketPixels[i];
        const i3 = i * 3;
        const angle = 3 * Math.PI / 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        positions[i3] = pixel.x * cos - pixel.y * sin;
        positions[i3 + 1] = pixel.x * sin + pixel.y * cos;
        positions[i3 + 2] = 0;

        colors[i3] = pixel.color[0];
        colors[i3 + 1] = pixel.color[1];
        colors[i3 + 2] = pixel.color[2];
    }

    rocketGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    rocketGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const rocketMaterial = new THREE.PointsMaterial({
        size: 0.25,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
    });

    return new THREE.Points(rocketGeometry, rocketMaterial);
}




function createMassiveAsteroid() {
    const geometry = new THREE.BufferGeometry();
    const asteroidCount = 120;
    const positions = new Float32Array(asteroidCount * 3);
    const colors = new Float32Array(asteroidCount * 3);

    const asteroidPixels = [
       
        { x: -0.2, y: 0.5, color: [0.4, 0.25, 0.15] },
        { x: 0, y: 0.5, color: [0.45, 0.28, 0.18] },
        { x: 0.2, y: 0.5, color: [0.4, 0.25, 0.15] },

       
        { x: -0.25, y: 0.35, color: [0.5, 0.3, 0.2] },
        { x: -0.1, y: 0.35, color: [0.05, 0.02, 0.01] }, 
        { x: 0.1, y: 0.35, color: [0.05, 0.02, 0.01] }, 
        { x: 0.25, y: 0.35, color: [0.5, 0.3, 0.2] },

        { x: -0.3, y: 0.15, color: [0.45, 0.28, 0.18] },
        { x: -0.15, y: 0.15, color: [0.4, 0.25, 0.15] },
        { x: 0, y: 0.15, color: [0.05, 0.02, 0.01] }, 
        { x: 0.15, y: 0.15, color: [0.45, 0.28, 0.18] },
        { x: 0.3, y: 0.15, color: [0.4, 0.25, 0.15] },

        
        { x: -0.25, y: -0.05, color: [0.5, 0.28, 0.2] },
        { x: -0.1, y: -0.05, color: [0.4, 0.25, 0.15] },
        { x: 0.1, y: -0.05, color: [0.4, 0.25, 0.15] },
        { x: 0.25, y: -0.05, color: [0.45, 0.28, 0.18] },

        { x: -0.15, y: -0.25, color: [0.45, 0.28, 0.18] },
        { x: 0, y: -0.25, color: [0.4, 0.2, 0.1] },
        { x: 0.15, y: -0.25, color: [0.45, 0.28, 0.18] },

        { x: 0, y: -0.4, color: [0.4, 0.2, 0.1] },
    ];

    for (let i = 0; i < asteroidCount; i++) {
        const pixel = asteroidPixels[i % asteroidPixels.length];
        const i3 = i * 3;
        positions[i3] = pixel.x + (Math.random() - 0.5) * 0.05; 
        positions[i3 + 1] = pixel.y + (Math.random() - 0.5) * 0.05;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.05; 

        colors[i3] = pixel.color[0];
        colors[i3 + 1] = pixel.color[1];
        colors[i3 + 2] = pixel.color[2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.9,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
    });

    return new THREE.Points(geometry, material);
}


function createNebula() {
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaCount = 150;
    const positions = new Float32Array(nebulaCount * 3);
    const colors = new Float32Array(nebulaCount * 3);
    
    for (let i = 0; i < nebulaCount; i++) {
        const i3 = i * 3;
        
        positions[i3] = (Math.random() - 0.5) * 60;
        positions[i3 + 1] = (Math.random() - 0.5) * 40;
        positions[i3 + 2] = -35 - Math.random() * 25;
        
        const colorType = Math.random();
        if (colorType < 0.33) {
            colors[i3] = 0.8 + Math.random() * 0.2; 
            colors[i3 + 1] = 0.3 + Math.random() * 0.3;
            colors[i3 + 2] = 0.8 + Math.random() * 0.2;
        } else if (colorType < 0.66) {
            colors[i3] = 0.9 + Math.random() * 0.1; 
            colors[i3 + 1] = 0.4 + Math.random() * 0.4;
            colors[i3 + 2] = 0.6 + Math.random() * 0.3;
        } else {
            colors[i3] = 0.3 + Math.random() * 0.3; 
            colors[i3 + 1] = 0.5 + Math.random() * 0.3;
            colors[i3 + 2] = 0.9 + Math.random() * 0.1;
        }
    }
    
    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const nebulaMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    
    return new THREE.Points(nebulaGeometry, nebulaMaterial);
}

function createThrustParticles() {
    const particleCount = 80;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        const angle = 3 * Math.PI / 2;
        
       
        const engineX = (Math.random() < 0.5) ? -0.05 : 0.05;
        const engineY = -0.65;
        
        
        const offsetX = engineX + (Math.random() - 0.5) * 0.1;
        const offsetY = engineY + (Math.random() - 0.5) * 0.1;
        
        positions[i3] = offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
        positions[i3 + 1] = offsetX * Math.sin(angle) + offsetY * Math.cos(angle);
        positions[i3 + 2] = 0;
        
        const colorIntensity = Math.random();
        colors[i3] = 1; 
        colors[i3 + 1] = 0.3 + colorIntensity * 0.4; 
        colors[i3 + 2] = 0; 
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.12,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    return new THREE.Points(particles, particleMaterial);
}

const nebula = createNebula();

let rocket = null;
let thrustParticles = null;
let massiveAsteroid = null;
const isIndexPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');

if (isIndexPage) {
    rocket = createPixelRocket();
    thrustParticles = createThrustParticles();
    massiveAsteroid = createMassiveAsteroid();
    
    rocket.position.set(-8, 0, -10);
    rocket.rotation.z = Math.PI / 4; 
    thrustParticles.position.set(-8, 0, -10);
    thrustParticles.rotation.z = Math.PI / 4; 
    
    massiveAsteroid.position.set(15, 8, -20);
    
    scene.add(rocket);
    scene.add(thrustParticles);
    scene.add(massiveAsteroid);
}

scene.add(nebula);

let targetRotationX = 0;
let targetRotationY = 0;

function animate() {
    requestAnimationFrame(animate);
    
    stars.rotation.y += 0.0002;
    stars.rotation.x += 0.0001;
    stars.rotation.x += (targetRotationX - stars.rotation.x) * 0.06;
    stars.rotation.y += (targetRotationY - stars.rotation.y) * 0.06;
    
    
    const time = Date.now() * 0.001;
    if (isIndexPage && rocket) {
        
        const scrollY = window.scrollY;
        const scrollFactor = scrollY * 0.01;
        
        rocket.position.x = -8 + Math.sin(time * 0.1) * 1;
        rocket.position.y = Math.cos(time * 0.15) * 0.5 + scrollFactor; 
        rocket.position.z = -10; 
    }
    
    
    if (isIndexPage && massiveAsteroid) {
        const scrollY = window.scrollY;
        const scrollFactor = scrollY * 0.01;
        
        
        massiveAsteroid.position.x = 15 + Math.sin(time * 0.05) * 0.5;
        massiveAsteroid.position.y = 8 + Math.cos(time * 0.08) * 0.3 + scrollFactor; 
        massiveAsteroid.position.z = -20; 
        
        massiveAsteroid.rotation.z += 0.0003;
    }
    
    nebula.rotation.z += 0.0005;
    const nebulaPositions = nebula.geometry.attributes.position.array;
    for (let i = 0; i < nebulaPositions.length; i += 3) {
        nebulaPositions[i] += Math.sin(time * 0.02 + i * 0.01) * 0.002;
        nebulaPositions[i + 1] += Math.cos(time * 0.03 + i * 0.01) * 0.002;
    }
    nebula.geometry.attributes.position.needsUpdate = true;
    
    
    if (isIndexPage && thrustParticles) {
        
        const scrollY = window.scrollY;
        const scrollFactor = scrollY * 0.01;
        
        thrustParticles.position.x = -8 + Math.sin(time * 0.1) * 1;
        thrustParticles.position.y = Math.cos(time * 0.15) * 0.5 + scrollFactor;
        thrustParticles.position.z = -10;
        
        const thrustPositions = thrustParticles.geometry.attributes.position.array;
        for (let i = 0; i < thrustPositions.length; i += 3) {
            const angle = 3 * Math.PI / 2;
            const moveX = -0.02 * Math.cos(angle);
            const moveY = -0.02 * Math.sin(angle);
            
            thrustPositions[i] += moveX;
            thrustPositions[i + 1] += moveY;
            
            
            if (thrustPositions[i + 1] < -1.2) {
               
                const engineX = (Math.random() < 0.5) ? -0.05 : 0.05;
                const engineY = -0.65;
                
                const offsetX = engineX + (Math.random() - 0.5) * 0.1;
                const offsetY = engineY + (Math.random() - 0.5) * 0.1;
                
                thrustPositions[i] = offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
                thrustPositions[i + 1] = offsetX * Math.sin(angle) + offsetY * Math.cos(angle);
            }
        }
        thrustParticles.geometry.attributes.position.needsUpdate = true;
    }
    
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
    const y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    targetRotationX = Math.max(-0.35, Math.min(0.35, y));
    targetRotationY = Math.max(-0.35, Math.min(0.35, x));
});

(function initializeQuestSystem() {
    const panel = document.getElementById('quests-panel');
    if (!panel) return;
    const courseId = panel.getAttribute('data-course-id') || 'course_default';
    const defaultQuests = [
        { id: 'read_intro', title: 'Read Introduction', desc: 'Open the course introduction', reward: 10 },
        { id: 'complete_lesson_1', title: 'Finish Lesson 1', desc: 'Mark Lesson 1 as complete', reward: 20 },
        { id: 'complete_quiz_1', title: 'Pass Quiz 1', desc: 'Score 70%+ on Quiz 1', reward: 30 }
    ];

    function getState() {
        try {
            const raw = localStorage.getItem('sq_quests_' + courseId);
            if (!raw) return { completed: {}, points: 0 };
            return JSON.parse(raw);
        } catch (e) {
            return { completed: {}, points: 0 };
        }
    }

    function saveState(state) {
        try { localStorage.setItem('sq_quests_' + courseId, JSON.stringify(state)); } catch (e) {}
    }

    function getProgress(state) {
        const total = defaultQuests.length;
        const done = Object.values(state.completed).filter(Boolean).length;
        const pct = Math.round((done / total) * 100);
        return { total, done, pct };
    }

    function ensureToastContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    function showToast(message) {
        const container = ensureToastContainer();
        const el = document.createElement('div');
        el.className = 'toast';
        el.textContent = message;
        container.appendChild(el);
        setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 300ms'; }, 2200);
        setTimeout(() => { el.remove(); }, 2600);
    }

    function renderPanel(state) {
        const list = panel.querySelector('#quests-list');
        const progressFill = panel.querySelector('.progress-fill');
        const progressText = panel.querySelector('.progress-text');

        list.innerHTML = '';
        defaultQuests.forEach(q => {
            const item = document.createElement('li');
            item.className = 'quest-item';
            const checked = !!state.completed[q.id];
            item.innerHTML = `
                <input type="checkbox" ${checked ? 'checked' : ''} data-quest="${q.id}">
                <div><h4>${q.title}</h4><p>${q.desc}</p></div>
                <div class="quest-reward">+${q.reward} XP</div>
            `;
            list.appendChild(item);
        });

        const { pct, done, total } = getProgress(state);
        if (progressFill) progressFill.style.width = pct + '%';
        if (progressText) progressText.textContent = `${pct}% Complete (${done}/${total})`;

        list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', () => {
                const id = cb.getAttribute('data-quest');
                const wasCompleted = !!state.completed[id];
                state.completed[id] = cb.checked;
                if (!wasCompleted && cb.checked) {
                    state.points = (state.points || 0) + (defaultQuests.find(q => q.id === id)?.reward || 0);
                    showToast('Quest completed!');
                }
                saveState(state);
                renderPanel(state);
            });
        });
    }

    function bindToggles() {
        const openBtn = document.getElementById('quests-toggle');
        const closeBtn = document.getElementById('quests-close');
        if (openBtn && panel) openBtn.addEventListener('click', () => panel.classList.toggle('hidden'));
        if (closeBtn && panel) closeBtn.addEventListener('click', () => panel.classList.add('hidden'));
    }

    const state = getState();
    bindToggles();
    renderPanel(state);
})();