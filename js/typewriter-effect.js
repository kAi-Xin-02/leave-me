class TypewriterEffect {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.typingSpeed = options.typingSpeed || 200;
        this.deletingSpeed = options.deletingSpeed || 100;
        this.delayBetween = options.delayBetween || 2000;
        this.loop = options.loop !== undefined ? options.loop : true;
        this.glitchChance = options.glitchChance || 0.1;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.cursorVisible = true;
        this.init();
    }
    init() {
        setInterval(() => { this.cursorVisible = !this.cursorVisible; this.updateDisplay(); }, 500);
        this.type();
    }
    updateDisplay() {
        const currentText = this.texts[this.currentTextIndex];
        const displayText = currentText.slice(0, this.currentCharIndex);
        this.element.textContent = displayText + (this.cursorVisible ? '|' : ' ');
        if (Math.random() < this.glitchChance && displayText.length > 0) {
            this.element.classList.add('glitch');
            setTimeout(() => this.element.classList.remove('glitch'), 200);
        }
    }
    type() {
        const currentText = this.texts[this.currentTextIndex];
        if (!this.isDeleting && this.currentCharIndex < currentText.length) {
            this.currentCharIndex++;
            this.updateDisplay();
            setTimeout(() => this.type(), this.typingSpeed);
        } else if (this.isDeleting && this.currentCharIndex > 0) {
            this.currentCharIndex--;
            this.updateDisplay();
            setTimeout(() => this.type(), this.deletingSpeed);
        } else if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            if (this.loop || this.texts.length > 1) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.delayBetween);
            }
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            setTimeout(() => this.type(), 500);
        }
    }
}

if (!document.getElementById('glitch-styles')) {
    const style = document.createElement('style');
    style.id = 'glitch-styles';
    style.textContent = `.glitch { animation: glitch-animation 0.2s; } @keyframes glitch-animation { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }`;
    document.head.appendChild(style);
}

window.TypewriterEffect = TypewriterEffect;
