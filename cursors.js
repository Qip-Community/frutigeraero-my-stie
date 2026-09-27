// ============================================
// AQUADREAMS 2000 — Custom Cursors
// ============================================

const cursors = [
    { name: 'default', label: '🖱️ Обычный' },
    { name: 'water', label: '💧 Вода' },
    { name: 'dolphin', label: '🐬 Дельфин' },
    { name: 'star', label: '⭐ Звезда' },
    { name: 'bubble', label: '🫧 Пузырь' }
];

let currentCursorIndex = 0;

// SVG-курсоры (в data-URL)
const cursorSVGs = {
    water: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <defs>
            <radialGradient id="wg" cx="35%" cy="30%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="40%" stop-color="#b3e5fc"/>
                <stop offset="100%" stop-color="#0288d1"/>
            </radialGradient>
        </defs>
        <path d="M16 2 C 16 2, 6 14, 6 20 A 10 10 0 0 0 26 20 C 26 14, 16 2, 16 2 Z" 
              fill="url(#wg)" stroke="#01579b" stroke-width="1.5"/>
        <ellipse cx="12" cy="14" rx="2" ry="3" fill="white" opacity="0.9"/>
    </svg>`,
    
    dolphin: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <text y="26" font-size="26">🐬</text>
    </svg>`,
    
    star: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <defs>
            <radialGradient id="sg">
                <stop offset="0%" stop-color="#fff9c4"/>
                <stop offset="100%" stop-color="#fbc02d"/>
            </radialGradient>
        </defs>
        <path d="M16 2 L20 12 L30 12 L22 19 L25 29 L16 23 L7 29 L10 19 L2 12 L12 12 Z" 
              fill="url(#sg)" stroke="#f57f17" stroke-width="1"/>
    </svg>`,
    
    bubble: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <defs>
            <radialGradient id="bg" cx="30%" cy="30%">
                <stop offset="0%" stop-color="white"/>
                <stop offset="50%" stop-color="#b3e5fc" stop-opacity="0.8"/>
                <stop offset="100%" stop-color="#0288d1" stop-opacity="0.6"/>
            </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="13" fill="url(#bg)" stroke="#0277bd" stroke-width="1"/>
        <ellipse cx="11" cy="11" rx="3" ry="4" fill="white" opacity="0.85"/>
    </svg>`
};

function applyCursor(name) {
    const body = document.body;
    
    if (name === 'default') {
        body.style.cursor = '';
        document.querySelectorAll('*').forEach(el => {
            el.style.cursor = '';
        });
        return;
    }
    
    const svg = cursorSVGs[name];
    if (!svg) return;
    
    const encoded = encodeURIComponent(svg);
    const url = `url("data:image/svg+xml;charset=UTF-8,${encoded}") 8 8, auto`;
    
    body.style.cursor = url;
    document.querySelectorAll('a, button, .gallery-item, .link-banner, .playlist-item, .card, .ctrl-btn').forEach(el => {
        el.style.cursor = 'pointer';
    });
}

document.getElementById('cursorToggle')?.addEventListener('click', (e) => {
    currentCursorIndex = (currentCursorIndex + 1) % cursors.length;
    const cursor = cursors[currentCursorIndex];
    applyCursor(cursor.name);
    
    // Показать уведомление
    showPopup(
        '🖱️ Курсор изменён',
        `<p>Новый курсор: <b>${cursor.label}</b></p>
         <p style="font-size:0.85rem;">Нажимай ещё, чтобы сменить!</p>`,
        [{ label: 'OK', action: 'close' }]
    );
    
    playSound('click');
    console.log('Cursor:', cursor.label);
});

console.log('%c🖱️ Cursors loaded!', 'color: #7b1fa2;');