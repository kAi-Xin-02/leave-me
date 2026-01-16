document.addEventListener('DOMContentLoaded', () => {
    const profileCard = document.querySelector('.profile-card');
    const avatar = document.querySelector('.avatar');
    const profileContainer = document.querySelector('.profile-container');
    const displayName = document.getElementById('displayName');

    if (displayName && window.profile) {
        new TypewriterEffect(displayName, window.profile.displayName || window.profile.username, { loop: true, typingSpeed: 300, deletingSpeed: 150, delayBetween: 10000, glitchChance: 0.1 });
    }

    if (avatar && profileContainer) {
        avatar.addEventListener('click', () => {
            profileContainer.classList.remove('fast-orbit');
            profileContainer.classList.remove('orbit');
            void profileContainer.offsetWidth;
            profileContainer.classList.add('fast-orbit');
            setTimeout(() => { profileContainer.classList.remove('fast-orbit'); void profileContainer.offsetWidth; profileContainer.classList.add('orbit'); }, 500);
        });
        avatar.addEventListener('touchstart', (e) => {
            e.preventDefault();
            profileContainer.classList.remove('fast-orbit');
            profileContainer.classList.remove('orbit');
            void profileContainer.offsetWidth;
            profileContainer.classList.add('fast-orbit');
            setTimeout(() => { profileContainer.classList.remove('fast-orbit'); void profileContainer.offsetWidth; profileContainer.classList.add('orbit'); }, 500);
        });
        profileContainer.classList.add('orbit');
    }

    if (avatar) {
        const glitchOverlay = document.querySelector('.glitch-overlay');
        if (glitchOverlay) {
            avatar.addEventListener('mouseenter', () => { glitchOverlay.style.opacity = '1'; setTimeout(() => { glitchOverlay.style.opacity = '0'; }, 500); });
        }
    }

    if (profileCard) { setTimeout(() => { profileCard.classList.add('slide-in'); }, 100); }
});

if (document.querySelector('.profile-container')) { document.querySelector('.profile-container').classList.add('orbit'); }
