class BioTypewriter {
    constructor() {
        this.bioElement = document.getElementById('bio');
        this.messages = [];
        this.currentIndex = 0;
        this.init();
    }
    init() {
        if (!this.bioElement || !window.profile) return;
        const userBio = window.profile.bio;
        if (userBio) { this.messages = [userBio, "✨ leave.me"]; }
        else { this.messages = ["Digital minimalist", "leave.me"]; }
        new TypewriterEffect(this.bioElement, this.messages, { typingSpeed: 150, deletingSpeed: 75, delayBetween: 2000, loop: true, glitchChance: 0.05 });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const checkProfile = setInterval(() => { if (window.profile) { clearInterval(checkProfile); new BioTypewriter(); } }, 100);
    });
} else {
    setTimeout(() => { if (window.profile) { new BioTypewriter(); } }, 500);
}
