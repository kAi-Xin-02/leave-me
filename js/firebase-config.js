const firebaseConfig = {
    apiKey: "AIzaSyB6RGJjBoOL-nOzRwfU68gdCtKzpc1NHlk",
    authDomain: "leave-me-ab0c6.firebaseapp.com",
    projectId: "leave-me-ab0c6",
    storageBucket: "leave-me-ab0c6.firebasestorage.app",
    messagingSenderId: "1018629016750",
    appId: "1:1018629016750:web:2fd5c9688b0a4661bff13f",
    measurementId: "G-RF4Q47DZ5N"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

function getCurrentUser() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged(user => resolve(user));
    });
}

async function signUpWithEmail(email, password, username) {
    const usernameDoc = await db.collection('usernames').doc(username.toLowerCase()).get();
    if (usernameDoc.exists) {
        throw new Error('Username already taken');
    }

    const userCred = await auth.createUserWithEmailAndPassword(email, password);
    await createUserProfile(userCred.user, username);
    return userCred.user;
}

async function signInWithEmail(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

async function signInWithGoogle() {
    const result = await auth.signInWithPopup(googleProvider);
    if (result.additionalUserInfo.isNewUser) {
        const username = generateUsername(result.user.displayName || result.user.email);
        await createUserProfile(result.user, username);
    }
    return result.user;
}

async function signInWithGithub() {
    const result = await auth.signInWithPopup(githubProvider);
    if (result.additionalUserInfo.isNewUser) {
        const username = generateUsername(result.user.displayName || result.user.email);
        await createUserProfile(result.user, username);
    }
    return result.user;
}

function generateUsername(name) {
    const base = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15);
    const random = Math.floor(Math.random() * 1000);
    return base + random;
}

async function createUserProfile(user, username) {
    await db.collection('usernames').doc(username.toLowerCase()).set({
        uid: user.uid
    });

    await db.collection('users').doc(user.uid).set({
        username: username.toLowerCase(),
        displayName: user.displayName || username,
        email: user.email,
        bio: '',
        avatarUrl: user.photoURL || '',
        backgroundUrl: '',
        theme: {
            blur: 80,
            opacity: 0.7,
            accent: '#ffffff'
        },
        socialLinks: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function signOut() {
    return auth.signOut();
}

async function getUserProfile(userId) {
    const doc = await db.collection('users').doc(userId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
}

async function getUserByUsername(username) {
    const usernameDoc = await db.collection('usernames').doc(username.toLowerCase()).get();
    if (!usernameDoc.exists) return null;
    return getUserProfile(usernameDoc.data().uid);
}

async function updateProfile(userId, data) {
    await db.collection('users').doc(userId).update(data);
}

async function sendMessage(toUserId, message) {
    const user = auth.currentUser;
    if (!user) {
        throw new Error('You must be logged in to send a message');
    }

    const senderProfile = await getUserProfile(user.uid);

    await db.collection('messages').add({
        toUserId,
        fromUserId: user.uid,
        fromName: senderProfile?.displayName || user.displayName || 'Anonymous',
        fromAvatar: senderProfile?.avatarUrl || user.photoURL || '',
        message,
        read: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

async function getMessages(userId) {
    const snapshot = await db.collection('messages')
        .where('toUserId', '==', userId)
        .orderBy('timestamp', 'desc')
        .limit(50)
        .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function deleteMessage(messageId) {
    await db.collection('messages').doc(messageId).delete();
}

async function markAsRead(messageId) {
    await db.collection('messages').doc(messageId).update({ read: true });
}

async function uploadFile(file, path) {
    const ref = storage.ref(path);
    await ref.put(file);
    return ref.getDownloadURL();
}

function isLoggedIn() {
    return auth.currentUser !== null;
}

async function incrementViews(userId) {
    await db.collection('users').doc(userId).update({
        views: firebase.firestore.FieldValue.increment(1)
    });
}

async function getViews(userId) {
    const doc = await db.collection('users').doc(userId).get();
    return doc.exists ? (doc.data().views || 0) : 0;
}
