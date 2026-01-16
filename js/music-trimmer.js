document.addEventListener('DOMContentLoaded', () => {
    const musicFile = document.getElementById('musicFile');
    const musicTrimmer = document.getElementById('musicTrimmer');
    const musicPreview = document.getElementById('musicPreviewAudio');
    const startSlider = document.getElementById('startSlider');
    const endSlider = document.getElementById('endSlider');
    const startTimeDisplay = document.getElementById('startTimeDisplay');
    const endTimeDisplay = document.getElementById('endTimeDisplay');
    const sliderRange = document.getElementById('sliderRange');
    const clearMusicBtn = document.getElementById('clearMusic');
    let musicDuration = 0;
    let selectedMusicFile = null;

    if (musicFile) {
        musicFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) { musicTrimmer.style.display = 'none'; return; }
            selectedMusicFile = file;
            document.getElementById('musicFileName').textContent = file.name;
            const url = URL.createObjectURL(file);
            musicPreview.src = url;
            musicTrimmer.style.display = 'block';
            musicPreview.addEventListener('loadedmetadata', () => {
                musicDuration = musicPreview.duration;
                startSlider.max = musicDuration;
                endSlider.max = musicDuration;
                endSlider.value = musicDuration;
                updateDisplay();
            }, { once: true });
        });

        if (startSlider && endSlider) {
            startSlider.addEventListener('input', () => {
                if (parseFloat(startSlider.value) >= parseFloat(endSlider.value)) startSlider.value = parseFloat(endSlider.value) - 0.1;
                updateDisplay();
                if (musicPreview) musicPreview.currentTime = parseFloat(startSlider.value);
            });
            endSlider.addEventListener('input', () => {
                if (parseFloat(endSlider.value) <= parseFloat(startSlider.value)) endSlider.value = parseFloat(startSlider.value) + 0.1;
                updateDisplay();
            });
            if (musicPreview) {
                musicPreview.addEventListener('timeupdate', () => {
                    if (musicPreview.currentTime >= parseFloat(endSlider.value)) { musicPreview.pause(); musicPreview.currentTime = parseFloat(startSlider.value); }
                });
            }
        }
        if (clearMusicBtn) {
            clearMusicBtn.addEventListener('click', () => {
                musicFile.value = '';
                musicTrimmer.style.display = 'none';
                selectedMusicFile = null;
                document.getElementById('musicFileName').textContent = 'Click to upload audio';
                if (musicPreview) { musicPreview.pause(); musicPreview.src = ''; }
            });
        }
    }

    function updateDisplay() {
        if (!startSlider || !endSlider) return;
        const startTime = parseFloat(startSlider.value);
        const endTime = parseFloat(endSlider.value);
        if (startTimeDisplay) startTimeDisplay.textContent = formatTime(startTime);
        if (endTimeDisplay) endTimeDisplay.textContent = formatTime(endTime);
        if (sliderRange && musicDuration > 0) {
            const startPercent = (startTime / musicDuration) * 100;
            const endPercent = (endTime / musicDuration) * 100;
            sliderRange.style.left = startPercent + '%';
            sliderRange.style.width = (endPercent - startPercent) + '%';
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
});

window.musicHelpers = {
    getMusicTrimData: function () {
        const startSlider = document.getElementById('startSlider');
        const endSlider = document.getElementById('endSlider');
        return { startTime: parseFloat(startSlider?.value || 0), endTime: parseFloat(endSlider?.value || 0) };
    }
};
