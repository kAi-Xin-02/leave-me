const SUPABASE_URL = window.APP_CONFIG?.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = window.APP_CONFIG?.SUPABASE_ANON_KEY || 'your-anon-key';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function formatUser(user) {
    if (!user) return null;
    return {
        uid: user.id,
        email: user.email,
        displayName: user.user_metadata?.full_name || user.user_metadata?.display_name || user.email?.split('@')[0],
        photoURL: user.user_metadata?.avatar_url || '',
        ...user
    };
}

function formatProfile(data) {
    if (!data) return null;
    return {
        id: data.id,
        username: data.username,
        displayName: data.display_name,
        email: data.email,
        bio: data.bio,
        avatarUrl: data.avatar_url,
        backgroundUrl: data.background_url,
        backgroundType: data.background_type || 'image',
        musicUrl: data.music_url,
        musicStartTime: data.music_start_time || 0,
        musicEndTime: data.music_end_time || 0,
        theme: data.theme || { blur: 80, opacity: 0.7, accent: '#ffffff' },
        socialLinks: data.social_links || [],
        views: data.views || 0
    };
}

function formatUpdates(updates) {
    const formatted = {};
    if (updates.displayName !== undefined) formatted.display_name = updates.displayName;
    if (updates.bio !== undefined) formatted.bio = updates.bio;
    if (updates.avatarUrl !== undefined) formatted.avatar_url = updates.avatarUrl;
    if (updates.backgroundUrl !== undefined) formatted.background_url = updates.backgroundUrl;
    if (updates.backgroundType !== undefined) formatted.background_type = updates.backgroundType;
    if (updates.musicUrl !== undefined) formatted.music_url = updates.musicUrl;
    if (updates.musicStartTime !== undefined) formatted.music_start_time = updates.musicStartTime;
    if (updates.musicEndTime !== undefined) formatted.music_end_time = updates.musicEndTime;
    if (updates.socialLinks !== undefined) formatted.social_links = updates.socialLinks;
    if (updates.theme !== undefined) formatted.theme = updates.theme;
    return formatted;
}

async function signUpWithEmail(email, password, username) {
    const { data: existingUser } = await sb.from('profiles').select('username').eq('username', username.toLowerCase()).single();
    if (existingUser) throw new Error('Username already taken');
    const { data, error } = await sb.auth.signUp({ email, password, options: { data: { username: username.toLowerCase(), display_name: username } } });
    if (error) throw error;
    await sb.from('profiles').insert({ id: data.user.id, username: username.toLowerCase(), display_name: username, email: email, bio: '', avatar_url: '', background_url: '', theme: { blur: 80, opacity: 0.7, accent: '#ffffff' }, social_links: [], views: 0 });
    return formatUser(data.user);
}

async function signInWithEmail(email, password) {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return formatUser(data.user);
}

async function signInWithGoogle() {
    const { data, error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/dashboard.html' } });
    if (error) throw error;
    return data;
}

async function signInWithGithub() {
    const { data, error } = await sb.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: window.location.origin + '/dashboard.html' } });
    if (error) throw error;
    return data;
}

function generateUsername(name) {
    const base = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15);
    return base + Math.floor(Math.random() * 1000);
}

async function signOut() { await sb.auth.signOut(); }
async function getCurrentUser() { const { data: { user } } = await sb.auth.getUser(); return formatUser(user); }

async function getUserProfile(userId) {
    const { data, error } = await sb.from('profiles').select('*').eq('id', userId).single();
    if (error) return null;
    return formatProfile(data);
}

async function getUserByUsername(username) {
    const { data, error } = await sb.from('profiles').select('*').eq('username', username.toLowerCase()).single();
    if (error) return null;
    return formatProfile(data);
}

async function updateProfile(userId, updates) {
    const { error } = await sb.from('profiles').update(formatUpdates(updates)).eq('id', userId);
    if (error) throw error;
}

async function sendMessage(toUserId, message) {
    const user = await getCurrentUser();
    if (!user) throw new Error('You must be logged in to send a message');
    const senderProfile = await getUserProfile(user.uid);
    const { error } = await sb.from('messages').insert({ to_user_id: toUserId, from_user_id: user.uid, from_name: senderProfile?.displayName || user.displayName || 'Anonymous', from_avatar: senderProfile?.avatarUrl || user.photoURL || '', message: message, read: false });
    if (error) throw error;
}

async function getMessages(userId) {
    const { data, error } = await sb.from('messages').select('*').eq('to_user_id', userId).order('created_at', { ascending: false }).limit(50);
    if (error) return [];
    return data.map(msg => ({ id: msg.id, fromName: msg.from_name, fromAvatar: msg.from_avatar, message: msg.message, read: msg.read, timestamp: { toDate: () => new Date(msg.created_at) } }));
}

async function deleteMessage(messageId) { const { error } = await sb.from('messages').delete().eq('id', messageId); if (error) throw error; }
async function markAsRead(messageId) { const { error } = await sb.from('messages').update({ read: true }).eq('id', messageId); if (error) throw error; }

async function uploadFile(file, path) {
    const cleanPath = path.replace(/^\/+/, '');
    const { data, error } = await sb.storage.from('public').upload(cleanPath + '-' + Date.now(), file, { upsert: true });
    if (error) throw error;
    const { data: { publicUrl } } = sb.storage.from('public').getPublicUrl(data.path);
    return publicUrl;
}

async function incrementViews(userId) { await sb.rpc('increment_views', { p_user_id: userId }); }
async function getViews(userId) { const { data } = await sb.from('profiles').select('views').eq('id', userId).single(); return data?.views || 0; }

function onAuthStateChange(callback) { sb.auth.onAuthStateChange((event, session) => { callback(formatUser(session?.user || null)); }); }
const auth = { onAuthStateChanged: onAuthStateChange, get currentUser() { return null; } };
window.supabaseClient = sb;
