const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

let db = null;
let isFirebaseInitialized = false;

function initFirebase() {
    try {
        if (!firebase || !firebase.apps) {
            throw new Error('Firebase SDK not loaded');
        }

        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }

        db = firebase.firestore();
        isFirebaseInitialized = true;
        return true;
    } catch (error) {
        console.error('Firebase initialization error:', error);
        return false;
    }
}

async function addMessage(name, message) {
    if (!isFirebaseInitialized) {
        const initialized = initFirebase();
        if (!initialized) {
            throw new Error('Firebase not initialized');
        }
    }

    try {
        const docRef = await db.collection('messages').add({
            name: name,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            ip: null
        });

        return { success: true, id: docRef.id };
    } catch (error) {
        if (error.code === 'resource-exhausted') {
            throw new Error('Message limit reached. Please try again tomorrow.');
        }

        if (error.message.includes('network')) {
            throw new Error('Network error. Please check your connection.');
        }

        throw new Error('Failed to send message. Please try again.');
    }
}

async function getMessages(limit = 50) {
    if (!isFirebaseInitialized) {
        const initialized = initFirebase();
        if (!initialized) {
            throw new Error('Firebase not initialized');
        }
    }

    try {
        const snapshot = await db.collection('messages')
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();

        const messages = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            messages.push({
                id: doc.id,
                name: data.name,
                message: data.message,
                timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
            });
        });

        return messages;
    } catch (error) {
        if (error.code === 'resource-exhausted') {
            throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Failed to load messages.');
    }
}

async function deleteMessage(messageId) {
    if (!isFirebaseInitialized) {
        throw new Error('Firebase not initialized');
    }

    try {
        await db.collection('messages').doc(messageId).delete();
        return { success: true };
    } catch (error) {
        throw new Error('Failed to delete message.');
    }
}
