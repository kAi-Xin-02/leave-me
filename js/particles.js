class ParticleSystem {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }
    init() {
        for (let i = 0; i < this.particleCount; i++) this.createParticle();
        this.animate();
    }
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `position: absolute; width: 2px; height: 2px; background: rgba(168, 85, 247, 0.5); border-radius: 50%; pointer-events: none;`;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = 20 + Math.random() * 40;
        const delay = Math.random() * 20;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animation = `float ${duration}s ${delay}s infinite`;
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    animate() { }
}

const style = document.createElement('style');
style.textContent = `@keyframes float { 0%, 100% { transform: translate(0, 0); opacity: 0; } 10%, 90% { opacity: 1; } 50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); } }`;
document.head.appendChild(style);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { new ParticleSystem('particles'); });
} else {
    new ParticleSystem('particles');
}
