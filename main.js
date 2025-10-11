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

let targetRotationX = 0;
let targetRotationY = 0;

function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.0002;
    stars.rotation.x += 0.0001;
    stars.rotation.x += (targetRotationX - stars.rotation.x) * 0.06;
    stars.rotation.y += (targetRotationY - stars.rotation.y) * 0.06;
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