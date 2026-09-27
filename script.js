// ============================================
// AQUADREAMS 2000 — Main Script
// ============================================

// ===== PRELOADER =====
let loadProgress = 0;
const loadInterval = setInterval(() => {
    loadProgress += Math.random() * 15;
    if (loadProgress >= 100) {
        loadProgress = 100;
        clearInterval(loadInterval);
        setTimeout(() => {
            document.getElementById('preloader').classList.add('hidden');
            // Приветственное окно
            setTimeout(() => showWelcomePopup(), 800);
        }, 400);
    }
    document.getElementById('loadPercent').textContent = Math.floor(loadProgress);
    document.getElementById('loadBar').style.width = loadProgress + '%';
}, 150);

// ===== ГЕНЕРАЦИЯ ПУЗЫРЕЙ =====
let bubblesEnabled = true;
function createBubbles() {
    const container = document.getElementById('bubbles');
    if (!bubblesEnabled) return;
    
    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        const size = Math.random() * 60 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 15 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        
        container.appendChild(bubble);
    }
}

function toggleBubbles() {
    const container = document.getElementById('bubbles');
    const btn = document.getElementById('bubbleToggle');
    bubblesEnabled = !bubblesEnabled;
    
    if (bubblesEnabled) {
        createBubbles();
        btn.classList.add('active');
    } else {
        container.innerHTML = '';
        btn.classList.remove('active');
    }
}

// ===== ПЕЧАТАЮЩИЙСЯ ТЕКСТ =====
const typingMessages = [
    '✨ Технологии и природа в гармонии ✨',
    '💧 Пузыри, глянец и вода 💧',
    '🌿 Лучшая эстетика 2000-х 🌿',
    '🎵 Включи MIDI-музыку! 🎵',
    '💾 Best viewed in IE 6.0 💾'
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const el = document.getElementById('typingText');
    if (!el) return;
    
    const current = typingMessages[typingIndex];
    
    if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let speed = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingMessages.length;
        speed = 500;
    }
    
    setTimeout(typeText, speed);
}

// ===== ЧАСЫ =====
function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    if (clock) {
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        clock.textContent = `${h}:${m}:${s}`;
    }
}

// ===== UPTIME =====
let uptimeSeconds = 0;
function updateUptime() {
    uptimeSeconds++;
    const h = String(Math.floor(uptimeSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((uptimeSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(uptimeSeconds % 60).padStart(2, '0');
    const el = document.getElementById('uptime');
    if (el) el.textContent = `${h}:${m}:${s}`;
}

// ===== СЧЁТЧИК ПОСЕТИТЕЛЕЙ =====
function updateVisitorCounter() {
    const numEl = document.getElementById('visitorNum');
    if (!numEl) return;
    
    let stored = localStorage.getItem('aquaVisitors');
    let count = stored ? parseInt(stored) : 4204;
    count++;
    localStorage.setItem('aquaVisitors', count);
    
    // Анимированный счётчик
    let current = count - 100;
    const interval = setInterval(() => {
        current += 5;
        if (current >= count) {
            current = count;
            clearInterval(interval);
        }
        numEl.textContent = current.toLocaleString('ru-RU');
    }, 30);
}

// ===== МАГИЯ КНОПКИ =====
function showMagic() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => createBurstBubble(), i * 20);
    }
    setTimeout(() => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    }, 400);
}

function createBurstBubble() {
    const bubble = document.createElement('div');
    const size = Math.random() * 30 + 10;
    
    Object.assign(bubble.style, {
        position: 'fixed',
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9999',
        background: `radial-gradient(circle at 30% 30%, 
            rgba(255,255,255,0.95), 
            rgba(79,195,247,0.6), 
            rgba(2,136,209,0.4))`,
        boxShadow: '0 0 20px rgba(79,195,247,0.9)',
        left: '50%',
        top: '50%'
    });
    
    document.body.appendChild(bubble);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 500 + 150;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;
    const duration = 1000 + Math.random() * 800;
    
    bubble.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0.2)`, opacity: 0 }
    ], {
        duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => bubble.remove(), duration);
}

// ===== ВСПЛЫВАЮЩЕЕ ОКНО В СТИЛЕ WIN98 =====
function showPopup(title, content, buttons = []) {
    const popup = document.createElement('div');
    popup.className = 'popup-window';
    
    // Позиция
    const maxX = window.innerWidth - 400;
    const maxY = window.innerHeight - 300;
    popup.style.left = Math.max(20, Math.random() * maxX) + 'px';
    popup.style.top = Math.max(60, Math.random() * maxY) + 'px';
    
    let buttonsHTML = '';
    if (buttons.length === 0) {
        buttonsHTML = `<button class="win98-btn popup-ok">OK</button>`;
    } else {
        buttonsHTML = buttons.map(b => 
            `<button class="win98-btn" data-action="${b.action}">${b.label}</button>`
        ).join('');
    }
    
    popup.innerHTML = `
        <div class="popup-titlebar">
            <span>${title}</span>
            <button class="popup-close">✕</button>
        </div>
        <div class="popup-body">
            ${content}
            <div style="text-align: right; margin-top: 15px;">
                ${buttonsHTML}
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Делаем перетаскиваемым
    makeDraggable(popup);
    
    // Закрытие
    popup.querySelector('.popup-close').addEventListener('click', () => closePopup(popup));
    
    const okBtn = popup.querySelector('.popup-ok');
    if (okBtn) okBtn.addEventListener('click', () => closePopup(popup));
    
    popup.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            if (action === 'music') {
                toggleMusic();
            } else if (action === 'close') {
                closePopup(popup);
            }
        });
    });
    
    // Звук открытия
    playSound('popup');
    
    return popup;
}

function closePopup(popup) {
    playSound('click');
    popup.style.transition = 'all 0.3s';
    popup.style.opacity = '0';
    popup.style.transform = 'scale(0.8)';
    setTimeout(() => popup.remove(), 300);
}

function makeDraggable(el) {
    const titlebar = el.querySelector('.popup-titlebar');
    let isDragging = false;
    let offsetX, offsetY;
    
    titlebar.style.cursor = 'move';
    
    titlebar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        el.style.left = (e.clientX - offsetX) + 'px';
        el.style.top = (e.clientY - offsetY) + 'px';
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// ===== ПРИВЕТСТВЕННОЕ ОКНО =====
function showWelcomePopup() {
    showPopup(
        '💧 Добро пожаловать!',
        `<p style="font-family: 'Quicksand', sans-serif;">
            <strong>Привет, дорогой посетитель!</strong><br><br>
            Добро пожаловать на <b>AquaDreams 2000</b> — лучший сайт интернета! 🎉<br><br>
            Здесь ты найдёшь:<br>
            ✨ Глянцевые обои<br>
            🎵 MIDI-музыку<br>
            📖 Гостевую книгу<br>
            🫧 Пузыри и дельфинов<br><br>
            <em>Нажми ОК чтобы начать путешествие!</em>
        </p>`,
        [
            { label: '🎵 Включить музыку', action: 'music' },
            { label: 'OK', action: 'close' }
        ]
    );
}

// ===== ОКНО WIN98 =====
document.getElementById('win98Btn')?.addEventListener('click', () => {
    showPopup(
        'C:\\Program Files\\AquaDreams',
        `<p>🖥️ <b>Мой компьютер</b></p>
         <p style="font-family: monospace; font-size: 0.85rem;">
            Локальный диск (C:) — 2.1 GB свободно<br>
            📁 Мои документы<br>
            📁 Музыка (MIDI)<br>
            📁 Обои (1024×768)<br>
            📄 readme.txt<br>
            📄 screensaver.scr
         </p>`,
        [{ label: 'OK', action: 'close' }]
    );
});

// ===== ГАЛЕРЕЯ =====
function initGallery() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const emoji = item.querySelector('span').textContent;
            const label = item.querySelector('p').textContent;
            const name = item.dataset.name || label;
            
            playSound('click');
            
            showPopup(
                '🖼️ Просмотр обоев',
                `<div style="text-align: center; padding: 20px;">
                    <div style="font-size: 5rem; margin-bottom: 10px;">${emoji}</div>
                    <p><b>${name}</b></p>
                    <p style="font-size: 0.85rem; opacity: 0.7;">
                        Разрешение: 1024×768<br>
                        Формат: BMP<br>
                        Размер: 234 KB
                    </p>
                    <p style="margin-top: 12px; color: #000080;">
                        💾 Скачать обои для рабочего стола?
                    </p>
                </div>`,
                [
                    { label: '💾 Скачать', action: 'close' },
                    { label: '✕ Закрыть', action: 'close' }
                ]
            );
            
            item.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.15) rotate(5deg)' },
                { transform: 'scale(1)' }
            ], {
                duration: 500,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            });
        });
    });
}

// ===== ГОСТЕВАЯ КНИГА =====
const gbAvatars = ['🐬', '💾', '🎮', '🌊', '✨', '🦋', '🌸', '🐢', '💧', '🎵'];

document.getElementById('guestbookForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('gbName').value.trim();
    const site = document.getElementById('gbSite').value.trim();
    const message = document.getElementById('gbMessage').value.trim();
    
    if (!name || !message) return;
    
    const avatar = gbAvatars[Math.floor(Math.random() * gbAvatars.length)];
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const entry = document.createElement('div');
    entry.className = 'gb-entry';
    entry.innerHTML = `
        <div class="gb-entry-header">
            <span class="gb-avatar">${avatar}</span>
            <strong>${escapeHtml(name)}</strong>
            ${site ? `<a href="${escapeHtml(site)}" target="_blank" style="font-size: 0.8rem; color: #4fc3f7;">🌐 сайт</a>` : ''}
            <span class="gb-date">${dateStr}</span>
        </div>
        <p>${escapeHtml(message)}</p>
    `;
    
    const entries = document.getElementById('guestbookEntries');
    entries.insertBefore(entry, entries.firstChild);
    
    // Прокрутка к новой записи
    entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Уведомление
    showPopup(
        '✅ Сообщение добавлено!',
        `<p>Спасибо, <b>${escapeHtml(name)}</b>! 💙</p>
         <p>Твоё сообщение добавлено в гостевую книгу.</p>`,
        [{ label: 'OK', action: 'close' }]
    );
    
    playSound('success');
    e.target.reset();
});

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== ПАНЕЛЬ УПРАВЛЕНИЯ =====
document.getElementById('topBtn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playSound('click');
});

document.getElementById('bubbleToggle')?.addEventListener('click', () => {
    toggleBubbles();
    playSound('click');
});

document.getElementById('themeToggle')?.addEventListener('click', (e) => {
    const themes = ['', 'theme-sunset', 'theme-matrix'];
    const current = document.body.className.replace('theme-', '').trim();
    let idx = 0;
    
    if (document.body.classList.contains('theme-sunset')) idx = 1;
    if (document.body.classList.contains('theme-matrix')) idx = 2;
    
    idx = (idx + 1) % themes.length;
    
    document.body.classList.remove('theme-sunset', 'theme-matrix');
    if (themes[idx]) document.body.classList.add(themes[idx]);
    
    playSound('click');
});

// ===== ПАРАЛЛАКС =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sphereContainer = document.querySelector('.sphere-container');
    if (sphereContainer) {
        sphereContainer.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ===== ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.animate([
                    { opacity: 0, transform: 'translateY(50px) scale(0.95)' },
                    { opacity: 1, transform: 'translateY(0) scale(1)' }
                ], {
                    duration: 700,
                    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                    fill: 'both'
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.card, .gallery-item, .guestbook-form, .winamp-player, .link-banner').forEach(el => {
        observer.observe(el);
    });
}

// ===== ЗВУКИ (Web Audio API) =====
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
}

function playSound(type) {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'popup') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.setValueAtTime(600, now + 0.05);
        osc.frequency.setValueAtTime(800, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + 0.08);
        osc.frequency.setValueAtTime(784, now + 0.16);
        osc.frequency.setValueAtTime(1047, now + 0.24);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
    }
}

// ===== КЛАВИШИ =====
document.addEventListener('keydown', (e) => {
    // Пробел — пузыри
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createBurstBubble(), i * 50);
        }
    }
    // Escape — закрыть попапы
    if (e.code === 'Escape') {
        document.querySelectorAll('.popup-window').forEach(p => closePopup(p));
    }
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    createBubbles();
    initGallery();
    initScrollAnimations();
    updateVisitorCounter();
    typeText();
    updateClock();
    setInterval(updateClock, 1000);
    setInterval(updateUptime, 1000);
    
    // Периодически случайные события
    setInterval(() => {
        if (Math.random() < 0.3 && document.querySelectorAll('.popup-window').length < 2) {
            const funPopups = [
                {
                    title: '💬 ICQ',
                    content: '<p><b>DolphinLover2000</b>: Привет! Как дела? 😊</p><p style="font-size:0.85rem; opacity:0.7;">Онлайн: 12 друзей</p>'
                },
                {
                    title: '📧 Новое письмо!',
                    content: '<p>От: <b>noreply@aquadreams2000.ru</b></p><p>Тема: <b>Ты выиграл 1000 пузырей! 🫧</b></p>'
                },
                {
                    title: '⚠️ Windows Update',
                    content: '<p>Доступно новое обновление!</p><p style="font-size:0.85rem;">Windows Aero Pack 2007</p>'
                }
            ];
            const p = funPopups[Math.floor(Math.random() * funPopups.length)];
            showPopup(p.title, p.content, [{ label: 'OK', action: 'close' }]);
        }
    }, 45000);
});

// ===== КОНСОЛЬ =====
console.log('%c💧 AQUADREAMS 2000 💧', 
    'font-size: 24px; font-weight: bold; color: #4fc3f7; text-shadow: 0 2px 4px rgba(2,136,209,0.5);');
console.log('%cBest viewed in IE 6.0 при 800×600', 
    'font-size: 14px; color: #0288d1;');
console.log('%cСпасибо за посещение! 👋', 
    'font-size: 14px; color: #43a047;');