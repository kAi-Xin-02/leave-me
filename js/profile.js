const socialIcons = {
    github: '<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>',
    discord: '<svg viewBox="0 0 24 24"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    spotify: '<svg viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
    twitch: '<svg viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    snapchat: '<svg viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    steam: '<svg viewBox="0 0 24 24"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/></svg>',
    reddit: '<svg viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>',
    website: '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'
};

let profile = null;
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();
    setupCursorGlow();
    loadProfile();
    setupModal();
    setupAuthListeners();
});

function createSnowflakes() {
    const container = document.getElementById('particles');
    const snowflakes = ['❄', '❅', '❆', '*', '•'];

    for (let i = 0; i < 25; i++) {
        const el = document.createElement('div');
        el.className = 'snowflake';
        el.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 10 + 12) + 's';
        el.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(el);
    }
}

async function loadProfile() {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const userFromQuery = urlParams.get('user');
    const pathParts = path.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    const username = userFromQuery || (lastPart !== 'u' && lastPart !== 'index.html' ? lastPart : null) || getUrlParam('u');

    if (!username) {
        document.querySelector('.profile-card').innerHTML = '<p>Profile not found</p>';
        return;
    }

    profile = await getUserByUsername(username);

    if (!profile) {
        document.querySelector('.profile-card').innerHTML = '<p>Profile not found</p>';
        return;
    }

    window.profile = profile;
    document.title = profile.displayName || profile.username;

    if (profile.avatarUrl) {
        document.getElementById('avatar').src = profile.avatarUrl;
    }

    document.getElementById('displayName').textContent = '';
    document.getElementById('bio').textContent = '';

    if (profile.backgroundUrl) {
        const bgMedia = document.getElementById('bgMedia');
        bgMedia.innerHTML = '';
        bgMedia.style.backgroundImage = '';

        const url = profile.backgroundUrl.toLowerCase();
        const isGif = url.includes('.gif') || profile.backgroundType === 'gif';
        const isVideo = profile.backgroundType === 'video' ||
            url.includes('.mp4') ||
            url.includes('.webm') ||
            url.includes('.mov');

        if (isGif) {
            const img = document.createElement('img');
            img.src = profile.backgroundUrl;
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
            bgMedia.appendChild(img);
        } else if (isVideo) {
            const video = document.createElement('video');
            video.src = profile.backgroundUrl;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'auto';
            video.style.cssText = 'width:100%;height:100%;object-fit:cover;';

            video.onerror = (e) => {
                bgMedia.style.backgroundImage = `url('${profile.backgroundUrl}')`;
                bgMedia.style.backgroundSize = 'cover';
                bgMedia.style.backgroundPosition = 'center';
            };

            bgMedia.appendChild(video);
            video.play().catch(e => console.log('Video autoplay blocked:', e));
        } else {
            bgMedia.style.backgroundImage = `url('${profile.backgroundUrl}')`;
            bgMedia.style.backgroundSize = 'cover';
            bgMedia.style.backgroundPosition = 'center';
        }
    }

    if (profile.theme) {
        const overlay = document.getElementById('bgOverlay');
        const blurAmount = profile.theme.blur !== undefined ? profile.theme.blur : 20;
        overlay.style.background = `rgba(0,0,0,${profile.theme.opacity || 0.5})`;
    }

    if (profile.musicUrl) {
        playBackgroundMusic(profile.musicUrl, profile.musicStartTime || 0, profile.musicEndTime || 0);
    }

    renderSocialLinks();
    trackView();
}

function playBackgroundMusic(url, startTime, endTime) {
    const existingAudio = document.getElementById('bgMusic');
    if (existingAudio) existingAudio.remove();

    const audio = document.createElement('audio');
    audio.id = 'bgMusic';
    audio.src = url;
    audio.loop = true;
    audio.volume = 0.3;

    if (startTime > 0) {
        audio.currentTime = startTime;
    }

    if (endTime > 0 && endTime > startTime) {
        audio.addEventListener('timeupdate', () => {
            if (audio.currentTime >= endTime) {
                audio.currentTime = startTime || 0;
            }
        });
    }

    document.body.appendChild(audio);

    const toggleBtn = document.getElementById('musicToggle');
    let hasPlayed = false;

    const updateUI = (playing) => {
        if (toggleBtn) {
            toggleBtn.style.display = 'flex';
            if (playing) {
                toggleBtn.classList.add('playing');
                toggleBtn.classList.remove('muted');
            } else {
                toggleBtn.classList.remove('playing');
                toggleBtn.classList.add('muted');
            }
        }
    };

    const tryPlay = () => {
        if (hasPlayed) return;
        audio.play().then(() => {
            hasPlayed = true;
            updateUI(true);
            removeListeners();
        }).catch(() => { });
    };

    const removeListeners = () => {
        document.removeEventListener('click', tryPlay);
        document.removeEventListener('touchstart', tryPlay);
        document.removeEventListener('mousemove', tryPlay);
        document.removeEventListener('scroll', tryPlay);
        document.removeEventListener('keydown', tryPlay);
    };

    if (toggleBtn) {
        toggleBtn.style.display = 'flex';
        toggleBtn.classList.add('playing');
        toggleBtn.classList.remove('muted');

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                audio.play();
                updateUI(true);
                hasPlayed = true;
            } else {
                audio.pause();
                updateUI(false);
            }
        });
    }

    document.addEventListener('click', tryPlay);
    document.addEventListener('touchstart', tryPlay);
    document.addEventListener('mousemove', tryPlay, { once: true });
    document.addEventListener('scroll', tryPlay, { once: true });
    document.addEventListener('keydown', tryPlay, { once: true });

    tryPlay();
}

async function trackView() {
    try {
        const viewedKey = 'viewed_' + profile.id;
        if (localStorage.getItem(viewedKey)) {
            const views = await getViews(profile.id);
            document.getElementById('viewCount').textContent = formatNumber(views);
            return;
        }
        const currentUser = await getCurrentUser();
        if (!currentUser || currentUser.uid !== profile.id) {
            await incrementViews(profile.id);
            localStorage.setItem(viewedKey, 'true');
        }
        const views = await getViews(profile.id);
        document.getElementById('viewCount').textContent = formatNumber(views);
    } catch (e) { }
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

function renderSocialLinks() {
    const container = document.getElementById('socialLinks');
    container.innerHTML = '';

    (profile.socialLinks || []).forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.className = 'social-link';
        a.title = link.platform;
        a.innerHTML = socialIcons[link.platform] || socialIcons.website;
        container.appendChild(a);
    });
}

function setupModal() {
    const modal = document.getElementById('messageModal');
    const openBtn = document.getElementById('openMessage');
    const closeBtn = document.getElementById('closeModal');
    const form = document.getElementById('messageForm');

    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        updateModalState();
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('active');
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const status = document.getElementById('messageStatus');

        btn.disabled = true;
        btn.textContent = 'Sending...';
        status.className = 'status';
        status.textContent = '';

        try {
            const message = document.getElementById('messageText').value.trim();

            if (message.length < 5) {
                throw new Error('Message must be at least 5 characters');
            }

            if (currentUser && currentUser.uid === profile.id) {
                throw new Error('You cannot send messages to yourself!');
            }

            await sendMessage(profile.id, message);

            status.className = 'status success';
            status.textContent = 'Message sent!';
            form.reset();

            setTimeout(() => {
                modal.classList.remove('active');
                status.textContent = '';
            }, 2000);
        } catch (err) {
            status.className = 'status error';
            status.textContent = err.message;
        } finally {
            btn.disabled = false;
            btn.textContent = 'Send Message';
        }
    });
}

function setupAuthListeners() {
    auth.onAuthStateChanged(user => {
        currentUser = user;
        updateModalState();
    });

    document.getElementById('msgGoogleBtn')?.addEventListener('click', async () => {
        try {
            await signInWithGoogle();
        } catch (err) {
            console.error(err);
        }
    });

    document.getElementById('msgGithubBtn')?.addEventListener('click', async () => {
        try {
            await signInWithGithub();
        } catch (err) {
            console.error(err);
        }
    });
}

function updateModalState() {
    const loginRequired = document.getElementById('loginRequired');
    const formContainer = document.getElementById('messageFormContainer');
    const senderInfo = document.getElementById('senderInfo');

    if (currentUser) {
        loginRequired.classList.add('hidden');
        formContainer.classList.remove('hidden');

        const avatar = currentUser.photoURL || '';
        const name = currentUser.displayName || currentUser.email || 'Anonymous';

        senderInfo.innerHTML = `
            ${avatar ? `<img src="${avatar}" alt="">` : ''}
            <span>Sending as ${name}</span>
        `;
    } else {
        loginRequired.classList.remove('hidden');
        formContainer.classList.add('hidden');
    }
}

function setupCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;

    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}
