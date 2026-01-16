document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('startScreen');
    const startText = document.getElementById('startText');
    const bgVideo = document.getElementById('bgVideo');
    if (!startScreen || !startText) return;

    const startMessage = "Click anywhere to begin your journey";
    let startTextContent = '';
    let startIndex = 0;
    let startCursorVisible = true;

    function typeWriterStart() {
        if (startIndex < startMessage.length) {
            startTextContent = startMessage.slice(0, startIndex + 1);
            startIndex++;
        }
        startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
        setTimeout(typeWriterStart, 100);
    }

    setInterval(() => {
        startCursorVisible = !startCursorVisible;
        startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
    }, 500);

    typeWriterStart();

    startScreen.addEventListener('click', () => {
        if (typeof gsap !== 'undefined') {
            gsap.to(startScreen, { opacity: 0, duration: 0.5, ease: 'power2.out', onComplete: () => { startScreen.style.display = 'none'; } });
        } else {
            startScreen.style.opacity = '0';
            setTimeout(() => { startScreen.style.display = 'none'; }, 500);
        }
        if (bgVideo) bgVideo.muted = false;
    });

    startScreen.addEventListener('touchstart', (e) => { e.preventDefault(); startScreen.click(); });
});
