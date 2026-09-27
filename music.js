// ============================================
// AQUADREAMS 2000 — Music Engine
// Синтезированная "MIDI" музыка в стиле 2000-х
// ============================================

let musicCtx = null;
let musicGain = null;
let musicPlaying = false;
let musicInterval = null;
let currentTrackIndex = 0;
let trackStartTime = 0;
let trackDuration = 213; // 3:33
let progressInterval = null;

// ===== ТРЕКИ (ноты) =====
const tracks = [
    {
        name: 'Frutiger Aero Dreams',
        bpm: 110,
        melody: [
            // Простая приятная мелодия (частоты нот)
            523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, 587.33, 523.25,
            493.88, 587.33, 698.46, 880.00, 698.46, 587.33, 523.25, 493.88,
            440.00, 523.25, 659.25, 783.99, 659.25, 523.25, 493.88, 440.00,
            392.00, 493.88, 587.33, 698.46, 587.33, 493.88, 440.00, 392.00
        ],
        bass: [130.81, 130.81, 146.83, 146.83, 130.81, 130.81, 98.00, 98.00]
    },
    {
        name: 'Windows XP Vibes',
        bpm: 120,
        melody: [
            392.00, 440.00, 493.88, 523.25, 587.33, 523.25, 493.88, 440.00,
            523.25, 587.33, 659.25, 698.46, 783.99, 698.46, 659.25, 587.33,
            659.25, 698.46, 783.99, 880.00, 987.77, 880.00, 783.99, 698.46,
            783.99, 880.00, 987.77, 1046.50, 1174.66, 1046.50, 987.77, 880.00
        ],
        bass: [98.00, 98.00, 110.00, 110.00, 123.47, 123.47, 130.81, 130.81]
    },
    {
        name: 'Y2K Bubblegum',
        bpm: 128,
        melody: [
            659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25, 587.33,
            523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25,
            587.33, 698.46, 880.00, 987.77, 880.00, 698.46, 587.33, 493.88,
            523.25, 659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25
        ],
        bass: [130.81, 146.83, 164.81, 174.61, 130.81, 146.83, 164.81, 174.61]
    },
    {
        name: 'Dial-up Memories',
        bpm: 100,
        melody: [
            440.00, 523.25, 493.88, 440.00, 392.00, 440.00, 493.88, 523.25,
            587.33, 523.25, 493.88, 440.00, 523.25, 587.33, 659.25, 698.46,
            659.25, 587.33, 523.25, 493.88, 440.00, 493.88, 523.25, 587.33,
            523.25, 493.88, 440.00, 392.00, 349.23, 392.00, 440.00, 493.88
        ],
        bass: [110.00, 110.00, 98.00, 98.00, 87.31, 87.31, 98.00, 98.00]
    },
    {
        name: 'Aero Glass Love',
        bpm: 105,
        melody: [
            523.25, 587.33, 659.25, 698.46, 783.99, 698.46, 659.25, 587.33,
            659.25, 698.46, 783.99, 880.00, 987.77, 880.00, 783.99, 698.46,
            783.99, 880.00, 987.77, 1046.50, 1174.66, 1046.50, 987.77, 880.00,
            987.77, 1046.50, 1174.66, 1318.51, 1174.66, 1046.50, 987.77, 880.00
        ],
        bass: [130.81, 130.81, 146.83, 146.83, 164.81, 164.81, 174.61, 174.61]
    }
];

// ===== ИНИЦИАЛИЗАЦИЯ =====
function initMusic() {
    if (musicCtx) return;
    
    musicCtx = new (window.AudioContext || window.webkitAudioContext)();
    musicGain = musicCtx.createGain();
    musicGain.gain.value = 0.08; // тихая фоновая музыка
    musicGain.connect(musicCtx.destination);
}

// ===== ВОСПРОИЗВЕДЕНИЕ НОТЫ =====
function playNote(frequency, duration, type = 'sine', volume = 0.1) {
    if (!musicCtx) return;
    
    const now = musicCtx.currentTime;
    const osc = musicCtx.createOscillator();
    const gain = musicCtx.createGain();
    
    osc.type = type;
    osc.frequency.value = frequency;
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc.connect(gain);
    gain.connect(musicGain);
    
    osc.start(now);
    osc.stop(now + duration);
}

// ===== ЗАПУСК ТРЕКА =====
function playTrack(index) {
    initMusic();
    
    if (musicCtx.state === 'suspended') {
        musicCtx.resume();
    }
    
    const track = tracks[index];
    const noteDuration = 60 / track.bpm / 2;
    
    let melodyIndex = 0;
    let bassIndex = 0;
    
    trackStartTime = Date.now();
    
    musicInterval = setInterval(() => {
        if (!musicPlaying) return;
        
        // Мелодия
        const melodyNote = track.melody[melodyIndex % track.melody.length];
        playNote(melodyNote, noteDuration * 0.9, 'sine', 0.08);
        melodyIndex++;
        
        // Бас каждый 4-й такт
        if (melodyIndex % 4 === 0) {
            const bassNote = track.bass[bassIndex % track.bass.length];
            playNote(bassNote, noteDuration * 1.8, 'triangle', 0.06);
            bassIndex++;
        }
    }, noteDuration * 1000);
    
    // Прогресс бар
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (!musicPlaying) return;
        
        const elapsed = (Date.now() - trackStartTime) / 1000;
        const progress = Math.min((elapsed / trackDuration) * 100, 100);
        
        const progressFill = document.getElementById('progressFill');
        if (progressFill) progressFill.style.width = progress + '%';
        
        const trackTime = document.getElementById('trackTime');
        if (trackTime) {
            const m = Math.floor(elapsed / 60);
            const s = Math.floor(elapsed % 60);
            trackTime.textContent = `${m}:${String(s).padStart(2, '0')}`;
        }
        
        // Авто-переход к следующему треку
        if (elapsed >= trackDuration) {
            nextTrack();
        }
    }, 500);
}

// ===== ОСТАНОВКА =====
function stopMusic() {
    musicPlaying = false;
    clearInterval(musicInterval);
    clearInterval(progressInterval);
    musicInterval = null;
    progressInterval = null;
}

// ===== ПЕРЕКЛЮЧАТЕЛЬ =====
function toggleMusic() {
    const btn = document.getElementById('musicToggle');
    const playBtn = document.getElementById('playBtn');
    
    if (musicPlaying) {
        stopMusic();
        musicPlaying = false;
        if (btn) btn.classList.remove('active');
        if (playBtn) playBtn.textContent = '▶';
    } else {
        musicPlaying = true;
        playTrack(currentTrackIndex);
        if (btn) btn.classList.add('active');
        if (playBtn) playBtn.textContent = '⏸';
        updatePlaylistUI();
    }
}

// ===== СЛЕДУЮЩИЙ ТРЕК =====
function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updateTrackInfo();
    updatePlaylistUI();
    
    if (musicPlaying) {
        stopMusic();
        musicPlaying = true;
        playTrack(currentTrackIndex);
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    updateTrackInfo();
    updatePlaylistUI();
    
    if (musicPlaying) {
        stopMusic();
        musicPlaying = true;
        playTrack(currentTrackIndex);
    }
}

function updateTrackInfo() {
    const track = tracks[currentTrackIndex];
    const nameEl = document.getElementById('trackName');
    if (nameEl) nameEl.textContent = '▶ ' + track.name;
    
    const timeEl = document.getElementById('trackTime');
    if (timeEl) timeEl.textContent = '0:00';
    
    const progressFill = document.getElementById('progressFill');
    if (progressFill) progressFill.style.width = '0%';
}

function updatePlaylistUI() {
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.classList.toggle('active', i === currentTrackIndex);
    });
}

// ===== ВИЗУАЛИЗАТОР =====
function initVisualizer() {
    const bars = document.querySelectorAll('#visualizer .bar');
    if (!bars.length) return;
    
    setInterval(() => {
        bars.forEach(bar => {
            if (musicPlaying) {
                const h = Math.random() * 90 + 10;
                bar.style.height = h + '%';
            } else {
                bar.style.height = '5%';
            }
        });
    }, 100);
}

// ===== ИНИЦИАЛИЗАЦИЯ УПРАВЛЕНИЯ ПЛЕЕРОМ =====
document.addEventListener('DOMContentLoaded', () => {
    initVisualizer();
    
    document.getElementById('musicToggle')?.addEventListener('click', () => {
        toggleMusic();
        playSound('click');
    });
    
    document.getElementById('playBtn')?.addEventListener('click', () => {
        toggleMusic();
        playSound('click');
    });
    
    document.getElementById('stopBtn')?.addEventListener('click', () => {
        stopMusic();
        musicPlaying = false;
        const btn = document.getElementById('musicToggle');
        const playBtn = document.getElementById('playBtn');
        if (btn) btn.classList.remove('active');
        if (playBtn) playBtn.textContent = '▶';
        
        const progressFill = document.getElementById('progressFill');
        if (progressFill) progressFill.style.width = '0%';
        
        playSound('click');
    });
    
    document.getElementById('nextBtn')?.addEventListener('click', () => {
        nextTrack();
        playSound('click');
    });
    
    document.getElementById('prevBtn')?.addEventListener('click', () => {
        prevTrack();
        playSound('click');
    });
    
    document.querySelectorAll('.playlist-item').forEach((item, i) => {
        item.addEventListener('click', () => {
            currentTrackIndex = i;
            updateTrackInfo();
            updatePlaylistUI();
            
            if (!musicPlaying) {
                toggleMusic();
            } else {
                stopMusic();
                musicPlaying = true;
                playTrack(currentTrackIndex);
            }
            
            playSound('click');
        });
    });
});

console.log('%c🎵 Music engine loaded!', 'color: #43a047;');