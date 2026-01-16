document.addEventListener('DOMContentLoaded', () => {
    createSnowflakes();

    const modal = document.getElementById('messageModal');
    const openBtn = document.getElementById('openMessageBtn');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.getElementById('messageForm');
    const notification = document.getElementById('notification');
    const videoBackground = document.getElementById('bgVideo');

    openBtn.addEventListener('click', () => {
        const rateCheck = ValidationUtils.checkRateLimit();
        if (!rateCheck.allowed) {
            showNotification(rateCheck.error, 'error');
            return;
        }
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            form.reset();
            clearFormErrors();
        }, 300);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearFormErrors();

        const nameInput = document.getElementById('visitorName');
        const messageInput = document.getElementById('visitorMessage');
        const submitBtn = form.querySelector('button[type="submit"]');

        const nameValidation = ValidationUtils.validateName(nameInput.value);
        if (!nameValidation.valid) {
            showFieldError('visitorName', nameValidation.error);
            return;
        }

        const messageValidation = ValidationUtils.validateMessage(messageInput.value);
        if (!messageValidation.valid) {
            showFieldError('visitorMessage', messageValidation.error);
            return;
        }

        const profanityCheck = ValidationUtils.basicProfanityFilter(messageValidation.value);
        if (!profanityCheck.clean) {
            showNotification(profanityCheck.error, 'error');
            return;
        }

        const rateCheck = ValidationUtils.checkRateLimit();
        if (!rateCheck.allowed) {
            showNotification(rateCheck.error, 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const sanitizedName = ValidationUtils.sanitizeHTML(nameValidation.value);
            const sanitizedMessage = ValidationUtils.sanitizeHTML(messageValidation.value);

            await addMessage(sanitizedName, sanitizedMessage);

            ValidationUtils.setRateLimit();
            showNotification('Message sent successfully! Thank you.', 'success');
            closeModal();

        } catch (error) {
            showNotification(error.message || 'Something went wrong. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.createElement('div');
        error.className = 'field-error';
        error.textContent = message;
        field.parentNode.appendChild(error);
        field.classList.add('error');
    }

    function clearFormErrors() {
        const errors = document.querySelectorAll('.field-error');
        errors.forEach(err => err.remove());
        const fields = document.querySelectorAll('.error');
        fields.forEach(field => field.classList.remove('error'));
    }

    function showNotification(message, type = 'info') {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    if (videoBackground) {
        videoBackground.addEventListener('loadeddata', () => {
            videoBackground.style.opacity = '1';
        });

        videoBackground.addEventListener('error', () => {
            videoBackground.style.display = 'none';
            document.querySelector('.video-overlay').style.background =
                'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)';
        });
    }

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });

        link.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.profile-card, .social-links').forEach(el => {
        observer.observe(el);
    });
});

function createSnowflakes() {
    const container = document.getElementById('snowflakes');
    if (!container) return;

    const snowflakeCount = 30;
    const snowflakes = ['❄', '❅', '❆', '*', '•'];

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];

        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 10 + 10) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 0.8 + 0.5) + 'em';

        container.appendChild(snowflake);
    }
}
