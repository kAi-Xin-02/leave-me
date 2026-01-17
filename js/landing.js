document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupTabs();
    setupForms();
    setupSocialAuth();
    checkAuthState();
});

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const eyeOpen = btn.querySelector('.eye-open');
    const eyeClosed = btn.querySelector('.eye-closed');
    if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        input.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
}

function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(particle);
    }
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const loginPanel = document.getElementById('loginPanel');
    const signupPanel = document.getElementById('signupPanel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tab.dataset.tab === 'login') {
                loginPanel.classList.add('active');
                signupPanel.classList.remove('active');
            } else {
                loginPanel.classList.remove('active');
                signupPanel.classList.add('active');
            }
        });
    });
}

function setupForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
}

async function handleLogin(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const statusEl = document.getElementById('statusMessage');
    btn.disabled = true;
    btn.textContent = 'Logging in...';
    if (statusEl) { statusEl.textContent = ''; statusEl.style.display = 'none'; }
    try {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        await signInWithEmail(email, password);
        window.location.href = 'dashboard.html';
    } catch (err) {
        if (statusEl) {
            if (err.message.includes('Email not confirmed')) {
                statusEl.innerHTML = '📧 Please check your email and click the confirmation link before logging in.';
                statusEl.style.color = '#fbbf24';
            } else {
                statusEl.textContent = err.message;
                statusEl.style.color = '#ff6b6b';
            }
            statusEl.style.display = 'block';
        }
    } finally {
        btn.disabled = false;
        btn.textContent = 'Login';
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const statusEl = document.getElementById('statusMessage');
    btn.disabled = true;
    btn.textContent = 'Creating account...';
    if (statusEl) { statusEl.textContent = ''; statusEl.style.display = 'none'; }
    try {
        const username = document.getElementById('signupUsername').value.toLowerCase();
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        if (!/^[a-z0-9_]+$/.test(username)) {
            throw new Error('Username can only contain lowercase letters, numbers, and underscores');
        }
        await signUpWithEmail(email, password, username);
        if (statusEl) {
            statusEl.innerHTML = `
                <div class="confirmation-message">
                    <div class="email-icon">📧</div>
                    <h3>Check your email!</h3>
                    <p>We've sent a confirmation link to <strong>${email}</strong>.<br>Click the link to activate your account.</p>
                </div>
            `;
            statusEl.style.display = 'block';
        }
    } catch (err) {
        if (statusEl) { statusEl.textContent = err.message; statusEl.style.color = '#ff6b6b'; statusEl.style.display = 'block'; }
    } finally {
        btn.disabled = false;
        btn.textContent = 'Create Account';
    }
}

function setupSocialAuth() {
    const statusEl = document.getElementById('statusMessage');
    const googleLogin = document.getElementById('googleLogin');
    const googleSignup = document.getElementById('googleSignup');
    const handleGoogle = async () => {
        try { if (statusEl) statusEl.textContent = 'Connecting to Google...'; await signInWithGoogle(); }
        catch (err) { if (statusEl) statusEl.textContent = 'Google login failed: ' + err.message; }
    };
    if (googleLogin) googleLogin.addEventListener('click', handleGoogle);
    if (googleSignup) googleSignup.addEventListener('click', handleGoogle);

    const githubLogin = document.getElementById('githubLogin');
    const githubSignup = document.getElementById('githubSignup');
    const handleGithub = async () => {
        try { if (statusEl) statusEl.textContent = 'Connecting to GitHub...'; await signInWithGithub(); }
        catch (err) { if (statusEl) statusEl.textContent = 'GitHub login failed: ' + err.message; }
    };
    if (githubLogin) githubLogin.addEventListener('click', handleGithub);
    if (githubSignup) githubSignup.addEventListener('click', handleGithub);
}

function checkAuthState() {
    if (typeof auth !== 'undefined' && auth.onAuthStateChanged) {
        auth.onAuthStateChanged(user => { if (user) window.location.href = 'dashboard.html'; });
    }
}

