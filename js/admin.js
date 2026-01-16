const ADMIN_PASSWORD = 'kaixin2026';

let currentSession = null;

document.addEventListener('DOMContentLoaded', () => {
    checkSession();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    const refreshBtn = document.getElementById('refreshMessages');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadMessages);
    }
});

function checkSession() {
    const session = sessionStorage.getItem('adminSession');
    if (session === 'authenticated') {
        currentSession = 'authenticated';
        showDashboard();
        loadMessages();
    } else {
        showLogin();
    }
}

function handleLogin(e) {
    e.preventDefault();
    const passwordInput = document.getElementById('adminPassword');
    const password = passwordInput.value;
    const errorDiv = document.getElementById('loginError');

    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminSession', 'authenticated');
        currentSession = 'authenticated';
        errorDiv.style.display = 'none';
        showDashboard();
        loadMessages();
    } else {
        errorDiv.textContent = 'Incorrect password';
        errorDiv.style.display = 'block';
        passwordInput.value = '';
    }
}

function handleLogout() {
    sessionStorage.removeItem('adminSession');
    currentSession = null;
    showLogin();
}

function showLogin() {
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('dashboardSection').style.display = 'none';
}

function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
}

async function loadMessages() {
    const container = document.getElementById('messagesContainer');
    const refreshBtn = document.getElementById('refreshMessages');

    refreshBtn.disabled = true;
    refreshBtn.textContent = 'Loading...';

    container.innerHTML = '<div class="loading">Loading messages...</div>';

    try {
        const messages = await getMessages(100);

        if (messages.length === 0) {
            container.innerHTML = '<div class="no-messages">No messages yet</div>';
            return;
        }

        container.innerHTML = '';
        messages.forEach(msg => {
            const messageCard = createMessageCard(msg);
            container.appendChild(messageCard);
        });

    } catch (error) {
        container.innerHTML = `<div class="error-message">Error: ${error.message}</div>`;
    } finally {
        refreshBtn.disabled = false;
        refreshBtn.textContent = 'Refresh';
    }
}

function createMessageCard(msg) {
    const card = document.createElement('div');
    card.className = 'message-card';

    const header = document.createElement('div');
    header.className = 'message-header';

    const name = document.createElement('span');
    name.className = 'message-name';
    name.textContent = msg.name;

    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = formatTimestamp(msg.timestamp);

    header.appendChild(name);
    header.appendChild(time);

    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = msg.message;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => handleDeleteMessage(msg.id, card);

    card.appendChild(header);
    card.appendChild(content);
    card.appendChild(deleteBtn);

    return card;
}

async function handleDeleteMessage(messageId, cardElement) {
    if (!confirm('Are you sure you want to delete this message?')) {
        return;
    }

    try {
        await deleteMessage(messageId);
        cardElement.style.opacity = '0';
        setTimeout(() => cardElement.remove(), 300);
    } catch (error) {
        alert('Failed to delete message: ' + error.message);
    }
}

function formatTimestamp(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
}
