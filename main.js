import { MessageDAO } from './supabaseClient.js';

const state = {
    audioPlaying: false,
    messages:
};

const overlay = document.getElementById('overlay-start');
const container = document.getElementById('main-container');
const audio = document.getElementById('bg-audio');
const video = document.getElementById('bg-video');
const form = document.getElementById('gb-form');
const feed = document.getElementById('message-feed');

async function init() {
    overlay.addEventListener('click', handleEntry);
    
   
    const { data, error } = await MessageDAO.fetchAll();
    if (error) {
        console.error("DB Error:", error);
        feed.innerHTML = '<div class="error">SYSTEM OFFLINE</div>';
    } else {
        feed.innerHTML = ''; 
        state.messages = data;
        renderMessages();
    }


    MessageDAO.subscribe((newMessage) => {
        state.messages.unshift(newMessage);
        renderSingleMessage(newMessage, true);
    });
}


function handleEntry() {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 800);
    
    container.classList.remove('hidden');
    container.classList.add('visible');
    
    
    video.play();
    audio.volume = 0.4;
    audio.play().catch(e => console.warn("Audio blocked:", e));
}


function renderMessages() {
    state.messages.forEach(msg => renderSingleMessage(msg));
}

function renderSingleMessage(msg, animate = false) {
    const el = document.createElement('div');
    el.className = 'msg-card';
    if (animate) el.classList.add('slide-in');
    
    
    const safeName = escapeHTML(msg.name);
    const safeMsg = escapeHTML(msg.message);
    const timestamp = new Date(msg.created_at).toLocaleTimeString(, {hour: '2-digit', minute:'2-digit'});

    el.innerHTML = `
        <div class="msg-meta">
            <span class="msg-user">${safeName}</span>
            <span class="msg-time">${timestamp}</span>
        </div>
        <div class="msg-text">${safeMsg}</div>
    `;
    
    feed.prepend(el);
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    
    const honeypot = document.getElementById('hp_field').value;
    if (honeypot) {
        console.log("Spam bot detected.");
        return; 
    }

    const name = document.getElementById('input-name').value;
    const msg = document.getElementById('input-msg').value;
    const btn = document.getElementById('btn-send');

    btn.textContent = "SENDING...";
    btn.disabled = true;

    const { error } = await MessageDAO.insert(name, msg);
    
    if (error) {
        alert("Error: " + error.message);
    } else {
        form.reset();
    }
    
    btn.textContent = "SEND";
    btn.disabled = false;
});


function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}

init();