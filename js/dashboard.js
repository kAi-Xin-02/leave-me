let currentUser = null;
let userProfile = null;
let cropper = null;
let currentCropFile = null;
let currentCropType = null;

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupNavigation();
    setupForms();
    setupThemeControls();
});

async function checkAuth() {
    const { data: { session } } = await window.supabaseClient.auth.getSession();

    if (session?.user) {
        currentUser = formatUser(session.user);

        let profile = await getUserProfile(currentUser.uid);
        if (!profile) {
            const username = generateUsername(currentUser.displayName || currentUser.email);
            try {
                await window.supabaseClient.from('profiles').insert({
                    id: currentUser.uid,
                    username: username.toLowerCase(),
                    display_name: currentUser.displayName || username,
                    email: currentUser.email,
                    bio: '',
                    avatar_url: currentUser.photoURL || '',
                    background_url: '',
                    theme: { blur: 80, opacity: 0.7, accent: '#ffffff' },
                    social_links: [],
                    views: 0
                });
            } catch (e) { }
        }

        await loadProfile();
        await loadMessages();
    } else {
        window.location.href = 'index.html';
    }

    auth.onAuthStateChanged(async user => {
        if (!user) {
            window.location.href = 'index.html';
        }
    });
}

async function loadProfile() {
    userProfile = await getUserProfile(currentUser.uid);
    if (!userProfile) return;

    document.getElementById('username').value = userProfile.username || '';
    document.getElementById('displayName').value = userProfile.displayName || '';
    document.getElementById('bio').value = userProfile.bio || '';

    if (userProfile.avatarUrl) {
        document.getElementById('avatarPreview').src = userProfile.avatarUrl;
    }

    if (userProfile.backgroundUrl) {
        document.getElementById('bgFileName').textContent = 'Background uploaded';
    }

    document.getElementById('accentColor').value = userProfile.theme?.accent || '#a855f7';
    document.getElementById('blurSlider').value = userProfile.theme?.blur || 50;
    document.getElementById('opacitySlider').value = (userProfile.theme?.opacity || 0.7) * 100;

    updatePreview();
    renderLinks();

    const baseUrl = window.location.origin + window.location.pathname.replace('dashboard.html', '');
    const profileLink = baseUrl + 'u/' + userProfile.username;

    document.getElementById('profileUrl').value = profileLink;
    document.getElementById('viewProfile').href = 'u/' + userProfile.username;

    // Update mobile profile link
    const mobileProfileUrl = document.getElementById('mobileProfileUrl');
    const mobileViewProfile = document.getElementById('mobileViewProfile');
    if (mobileProfileUrl) mobileProfileUrl.value = profileLink;
    if (mobileViewProfile) mobileViewProfile.href = 'u/' + userProfile.username;
}

function updatePreview() {
    if (!userProfile) return;

    document.getElementById('previewName').textContent = userProfile.displayName || userProfile.username;
    document.getElementById('previewBio').textContent = userProfile.bio || '';

    if (userProfile.avatarUrl) {
        document.getElementById('previewAvatar').src = userProfile.avatarUrl;
    }

    if (userProfile.backgroundUrl) {
        document.getElementById('previewBg').style.backgroundImage = `url(${userProfile.backgroundUrl})`;
    }

    const blur = document.getElementById('blurSlider').value;
    const opacity = document.getElementById('opacitySlider').value / 100;

    document.getElementById('previewOverlay').style.backdropFilter = `blur(${blur}px)`;
    document.getElementById('previewOverlay').style.background = `rgba(0,0,0,${opacity})`;

    document.getElementById('blurValue').textContent = blur;
    document.getElementById('opacityValue').textContent = opacity.toFixed(1);
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            sections.forEach(s => s.classList.add('hidden'));
            document.getElementById(item.dataset.section + 'Section').classList.remove('hidden');
        });
    });

    document.getElementById('logoutBtn').addEventListener('click', async () => {
        await signOut();
        window.location.href = 'index.html';
    });

    document.getElementById('copyLink').addEventListener('click', () => {
        const input = document.getElementById('profileUrl');
        input.select();
        document.execCommand('copy');
        document.getElementById('copyLink').textContent = 'Copied!';
        setTimeout(() => {
            document.getElementById('copyLink').textContent = 'Copy';
        }, 2000);
    });

    // Mobile copy link handler
    document.getElementById('mobileCopyLink')?.addEventListener('click', () => {
        const input = document.getElementById('mobileProfileUrl');
        input.select();
        navigator.clipboard.writeText(input.value).then(() => {
            document.getElementById('mobileCopyLink').textContent = '✓ Copied!';
            setTimeout(() => {
                document.getElementById('mobileCopyLink').textContent = '📋 Copy';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            document.execCommand('copy');
            document.getElementById('mobileCopyLink').textContent = '✓ Copied!';
            setTimeout(() => {
                document.getElementById('mobileCopyLink').textContent = '📋 Copy';
            }, 2000);
        });
    });
}

function setupForms() {
    document.getElementById('profileForm').addEventListener('submit', async e => {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        btn.disabled = true;
        btn.textContent = 'Saving...';
        btn.classList.add('saving');
        btn.classList.remove('saved');

        try {
            const updates = {
                displayName: document.getElementById('displayName').value,
                bio: document.getElementById('bio').value
            };

            const avatarFile = document.getElementById('avatarFile').files[0];
            if (avatarFile) {
                const url = await uploadFile(avatarFile, `avatars/${currentUser.uid}`);
                updates.avatarUrl = url;
            }

            const bgFile = document.getElementById('bgFile').files[0];
            if (bgFile) {
                const url = await uploadFile(bgFile, `backgrounds/${currentUser.uid}`);
                updates.backgroundUrl = url;

                if (bgFile.type.startsWith('video/')) {
                    updates.backgroundType = 'video';
                } else if (bgFile.type === 'image/gif') {
                    updates.backgroundType = 'gif';
                } else {
                    updates.backgroundType = 'image';
                }
            }

            const musicFile = document.getElementById('musicFile')?.files[0];
            if (musicFile) {
                const musicUrl = await uploadFile(musicFile, `music/${currentUser.uid}`);
                updates.musicUrl = musicUrl;

                if (window.musicHelpers && window.musicHelpers.getMusicTrimData) {
                    const trimData = window.musicHelpers.getMusicTrimData();
                    updates.musicStartTime = trimData.startTime;
                    updates.musicEndTime = trimData.endTime;
                } else {
                    updates.musicStartTime = 0;
                    updates.musicEndTime = 0;
                }
            }

            await updateProfile(currentUser.uid, updates);
            userProfile = { ...userProfile, ...updates };
            updatePreview();

            btn.textContent = '✓ Saved!';
            btn.classList.remove('saving');
            btn.classList.add('saved');
        } catch (err) {
            alert('Error: ' + err.message);
            btn.textContent = 'Save Changes';
            btn.classList.remove('saving');
        } finally {
            btn.disabled = false;
            setTimeout(() => {
                btn.textContent = 'Save Changes';
                btn.classList.remove('saved');
            }, 2500);
        }
    });

    document.getElementById('avatarFile').addEventListener('change', e => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            showCropper(file, 'avatar', 1);
        }
    });

    document.getElementById('bgFile').addEventListener('change', e => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                showCropper(file, 'background', 16 / 9);
            } else {
                document.getElementById('bgFileName').textContent = file.name;
            }
        }
    });

    document.getElementById('addLinkBtn').addEventListener('click', async () => {
        const platform = document.getElementById('platformSelect').value;
        const url = document.getElementById('linkUrl').value;

        if (!url) return;

        const links = userProfile.socialLinks || [];
        links.push({ platform, url });

        await updateProfile(currentUser.uid, { socialLinks: links });
        userProfile.socialLinks = links;
        renderLinks();
        document.getElementById('linkUrl').value = '';
    });

    // Username change handler
    document.getElementById('changeUsernameBtn').addEventListener('click', async () => {
        const btn = document.getElementById('changeUsernameBtn');
        const statusEl = document.getElementById('usernameStatus');
        const newUsername = document.getElementById('username').value.toLowerCase().trim();

        // Validate username format
        if (!/^[a-z0-9_]+$/.test(newUsername)) {
            statusEl.innerHTML = '<span style="color: #f87171;">❌ Only lowercase letters, numbers, and underscores allowed</span>';
            return;
        }

        if (newUsername.length < 3) {
            statusEl.innerHTML = '<span style="color: #f87171;">❌ Username must be at least 3 characters</span>';
            return;
        }

        if (newUsername.length > 22) {
            statusEl.innerHTML = '<span style="color: #f87171;">❌ Username must be 22 characters or less</span>';
            return;
        }

        if (newUsername === userProfile.username) {
            statusEl.innerHTML = '<span style="color: #fbbf24;">⚠️ This is already your username</span>';
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Checking...';
        statusEl.innerHTML = '';

        try {
            // Check if username is already taken
            const { data: existingUser } = await window.supabaseClient
                .from('profiles')
                .select('username')
                .eq('username', newUsername)
                .single();

            if (existingUser) {
                statusEl.innerHTML = '<span style="color: #f87171;">❌ Username already taken</span>';
                btn.textContent = 'Change';
                btn.disabled = false;
                return;
            }

            // Update username
            await window.supabaseClient
                .from('profiles')
                .update({ username: newUsername })
                .eq('id', currentUser.uid);

            userProfile.username = newUsername;

            // Update profile URL display
            const baseUrl = window.location.origin + window.location.pathname.replace('dashboard.html', '');
            const newProfileLink = baseUrl + 'u/' + newUsername;
            document.getElementById('profileUrl').value = newProfileLink;
            document.getElementById('viewProfile').href = 'u/' + newUsername;

            // Update mobile profile link
            const mobileProfileUrl = document.getElementById('mobileProfileUrl');
            const mobileViewProfile = document.getElementById('mobileViewProfile');
            if (mobileProfileUrl) mobileProfileUrl.value = newProfileLink;
            if (mobileViewProfile) mobileViewProfile.href = 'u/' + newUsername;

            statusEl.innerHTML = '<span style="color: #86efac;">✓ Username changed successfully!</span>';
            btn.textContent = 'Changed!';

            setTimeout(() => {
                btn.textContent = 'Change';
                statusEl.innerHTML = '';
            }, 3000);
        } catch (err) {
            statusEl.innerHTML = '<span style="color: #f87171;">❌ Error: ' + err.message + '</span>';
            btn.textContent = 'Change';
        } finally {
            btn.disabled = false;
        }
    });
}

function renderLinks() {
    const container = document.getElementById('linksList');
    container.innerHTML = '';

    (userProfile.socialLinks || []).forEach((link, index) => {
        const div = document.createElement('div');
        div.className = 'link-item';
        div.innerHTML = `
            <span class="platform">${link.platform}</span>
            <span>${link.url}</span>
            <button data-index="${index}">×</button>
        `;
        div.querySelector('button').addEventListener('click', async () => {
            const links = userProfile.socialLinks.filter((_, i) => i !== index);
            await updateProfile(currentUser.uid, { socialLinks: links });
            userProfile.socialLinks = links;
            renderLinks();
        });
        container.appendChild(div);
    });
}

async function loadMessages() {
    const messages = await getMessages(currentUser.uid);
    const container = document.getElementById('messagesList');
    const badge = document.getElementById('msgBadge');

    const unreadCount = messages.filter(m => !m.read).length;
    badge.textContent = unreadCount > 0 ? unreadCount : '';

    container.innerHTML = '';

    if (messages.length === 0) {
        container.innerHTML = '<p style="color: var(--text-dim);">No messages yet</p>';
        return;
    }

    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = 'message-item' + (msg.read ? '' : ' unread');

        const time = msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleString() : 'Just now';

        div.innerHTML = `
            <div class="message-header">
                <span class="message-from">${msg.fromName}</span>
                <span class="message-time">${time}</span>
            </div>
            <div class="message-text">${msg.message}</div>
            <button data-id="${msg.id}">Delete</button>
        `;

        div.addEventListener('click', async () => {
            if (!msg.read) {
                await markAsRead(msg.id);
                div.classList.remove('unread');
                const badge = document.getElementById('msgBadge');
                const current = parseInt(badge.textContent) || 0;
                badge.textContent = current > 1 ? current - 1 : '';
            }
        });

        div.querySelector('button').addEventListener('click', async ev => {
            ev.stopPropagation();
            await deleteMessage(msg.id);
            div.remove();
        });

        container.appendChild(div);
    });
}

function setupThemeControls() {
    const blurSlider = document.getElementById('blurSlider');
    const opacitySlider = document.getElementById('opacitySlider');

    blurSlider.addEventListener('input', updatePreview);
    opacitySlider.addEventListener('input', updatePreview);

    document.getElementById('saveTheme').addEventListener('click', async () => {
        const btn = document.getElementById('saveTheme');
        btn.disabled = true;
        btn.textContent = 'Saving...';

        try {
            const theme = {
                accent: document.getElementById('accentColor').value,
                blur: parseInt(blurSlider.value),
                opacity: parseInt(opacitySlider.value) / 100
            };

            await updateProfile(currentUser.uid, { theme });
            userProfile.theme = theme;
            btn.textContent = 'Saved!';
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            btn.disabled = false;
            setTimeout(() => { btn.textContent = 'Save Theme'; }, 2000);
        }
    });
}

function showCropper(file, type, aspectRatio) {
    currentCropFile = file;
    currentCropType = type;

    const reader = new FileReader();
    reader.onload = e => {
        const modal = document.getElementById('cropModal');
        const image = document.getElementById('cropImage');
        image.src = e.target.result;
        modal.classList.add('active');

        if (cropper) {
            cropper.destroy();
        }

        cropper = new Cropper(image, {
            aspectRatio: aspectRatio,
            viewMode: 1,
            autoCropArea: 1,
            responsive: true,
            background: false,
            guides: true,
            center: true,
            highlight: true,
            cropBoxResizable: true,
            cropBoxMovable: true,
            toggleDragModeOnDblclick: false
        });
    };
    reader.readAsDataURL(file);
}

document.getElementById('cancelCrop')?.addEventListener('click', () => {
    const modal = document.getElementById('cropModal');
    modal.classList.remove('active');
    if (cropper) {
        cropper.destroy();
        cropper = null;
    }
    document.getElementById('avatarFile').value = '';
    document.getElementById('bgFile').value = '';
});

document.getElementById('applyCrop')?.addEventListener('click', () => {
    if (!cropper || !currentCropFile) return;

    cropper.getCroppedCanvas({
        width: currentCropType === 'avatar' ? 400 : 1920,
        height: currentCropType === 'avatar' ? 400 : 1080,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
    }).toBlob(blob => {
        const croppedFile = new File([blob], currentCropFile.name, { type: currentCropFile.type });

        if (currentCropType === 'avatar') {
            const dataUrl = URL.createObjectURL(blob);
            document.getElementById('avatarPreview').src = dataUrl;
            const input = document.getElementById('avatarFile');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(croppedFile);
            input.files = dataTransfer.files;
        } else if (currentCropType === 'background') {
            document.getElementById('bgFileName').textContent = currentCropFile.name;
            const input = document.getElementById('bgFile');
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(croppedFile);
            input.files = dataTransfer.files;
        }

        const modal = document.getElementById('cropModal');
        modal.classList.remove('active');
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    }, currentCropFile.type);
});
