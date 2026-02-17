// ========================================
// REALMART - Firebase Configuration & Setup
// ========================================

// Wait for Firebase to be loaded
let db, auth, marketsRef, schedulesRef, usersRef;
let firebaseInitialized = false;

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUhBRsicJXWSQPlIBW2_ywx8TaJSroR4g",
    authDomain: "dailycontribution-4bca6.firebaseapp.com",
    projectId: "dailycontribution-4bca6",
    storageBucket: "dailycontribution-4bca6.appspot.com",
    messagingSenderId: "653066758262",
    appId: "1:653066758262:web:4ced0097861a636f1dd757"
};

// Initialize Firebase when available
function initializeFirebase() {
    if (typeof firebase === 'undefined' || !firebase.apps) {
        console.warn('Firebase SDK not loaded yet, retrying...');
        setTimeout(initializeFirebase, 100);
        return;
    }
    
    try {
        // Initialize Firebase if not already initialized
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        
        // Get Firebase services using compat API
        db = firebase.firestore();
        auth = firebase.auth();
        
        // ========================================
        // FIRESTORE REFERENCES
        // ========================================
        marketsRef = db.collection('markets');
        schedulesRef = db.collection('schedules');
        usersRef = db.collection('users');
        
        firebaseInitialized = true;
        console.log('Firebase initialized successfully');
        setupAuthListener();
    } catch (error) {
        console.error('Firebase initialization error:', error);
        setTimeout(initializeFirebase, 1000); // Retry after 1 second
    }
}

// ========================================
// CURRENT USER
// ========================================
let currentUser = null;
let currentUserData = null;

// Setup auth listener after Firebase is initialized
function setupAuthListener() {
    if (!auth) return;
    
    auth.onAuthStateChanged(async (user) => {
        currentUser = user;
        
        if (user) {
            // Fetch user data from Firestore
            try {
                const userDoc = await usersRef.doc(user.uid).get();
                if (userDoc.exists) {
                    currentUserData = userDoc.data();
                    currentUserData.uid = user.uid;
                    console.log('User logged in:', currentUserData);
                    
                    // Update UI if user element exists
                    const userElement = document.getElementById('currentUser');
                    if (userElement) {
                        userElement.textContent = currentUserData.email;
                    }
                    
                    // Show admin controls if user is admin
                    if (currentUserData.role === 'admin') {
                        showAdminControls();
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        } else {
            currentUserData = null;
            console.log('User logged out');
            
            // Hide admin controls
            hideAdminControls();
        }
    });
}
// ========================================
// FIREBASE UTILITY FUNCTIONS
// ========================================

/**
 * Check if user is logged in
 */
function isUserLoggedIn() {
    return currentUser !== null;
}

/**
 * Check if current user is admin
 */
function isUserAdmin() {
    return currentUserData && currentUserData.role === 'admin';
}

/**
 * Show admin controls (can be overridden in specific pages)
 */
function showAdminControls() {
    const adminElements = document.querySelectorAll('[data-admin-only]');
    adminElements.forEach(el => {
        el.classList.remove('hidden');
    });
}

/**
 * Hide admin controls
 */
function hideAdminControls() {
    const adminElements = document.querySelectorAll('[data-admin-only]');
    adminElements.forEach(el => {
        el.classList.add('hidden');
    });
}

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Firebase auth result
 */
async function loginWithEmail(email, password) {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        console.log('Login successful:', result.user.email);
        return result;
    } catch (error) {
        console.error('Login error:', error.message);
        throw error;
    }
}

/**
 * Register new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {object} userData - Additional user data
 * @returns {Promise} Firebase auth result
 */
async function registerUser(email, password, userData = {}) {
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        
        // Save user data to Firestore
        await usersRef.doc(result.user.uid).set({
            email: email,
            role: userData.role || 'user',
            createdAt: new Date(),
            ...userData
        });
        
        console.log('Registration successful:', email);
        return result;
    } catch (error) {
        console.error('Registration error:', error.message);
        throw error;
    }
}

/**
 * Logout current user
 * @returns {Promise}
 */
async function logoutUser() {
    try {
        await auth.signOut();
        console.log('Logout successful');
        currentUser = null;
        currentUserData = null;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

/**
 * Get current user's ID
 * @returns {string} User ID or null
 */
function getCurrentUserId() {
    return currentUser ? currentUser.uid : null;
}

/**
 * Get current user's email
 * @returns {string} User email or null
 */
function getCurrentUserEmail() {
    return currentUser ? currentUser.email : null;
}

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise}
 */
async function sendPasswordResetEmail(email) {
    try {
        await auth.sendPasswordResetEmail(email);
        console.log('Password reset email sent to:', email);
    } catch (error) {
        console.error('Password reset error:', error);
        throw error;
    }
}

/**
 * Update user password
 * @param {string} newPassword - New password
 * @returns {Promise}
 */
async function updateUserPassword(newPassword) {
    try {
        if (!currentUser) throw new Error('No user logged in');
        
        await currentUser.updatePassword(newPassword);
        console.log('Password updated successfully');
    } catch (error) {
        console.error('Password update error:', error);
        throw error;
    }
}

/**
 * Update user profile data
 * @param {object} updateData - Data to update
 * @returns {Promise}
 */
async function updateUserProfile(updateData) {
    try {
        if (!currentUser) throw new Error('No user logged in');
        
        await usersRef.doc(currentUser.uid).update({
            ...updateData,
            updatedAt: new Date()
        });
        
        // Update local currentUserData
        currentUserData = {
            ...currentUserData,
            ...updateData
        };
        
        console.log('User profile updated');
    } catch (error) {
        console.error('Profile update error:', error);
        throw error;
    }
}

// ========================================
// FIRESTORE QUERY HELPERS
// ========================================

/**
 * Get all documents from a collection
 * @param {string} collectionName - Collection name
 * @returns {Promise} Array of documents with IDs
 */
async function getAllDocuments(collectionName) {
    try {
        // Wait for Firebase to be initialized
        if (!firebaseInitialized || !db) {
            console.warn('Firebase not initialized yet, waiting...');
            await new Promise(resolve => {
                const checkInitialized = setInterval(() => {
                    if (firebaseInitialized && db) {
                        clearInterval(checkInitialized);
                        resolve();
                    }
                }, 50);
            });
        }
        
        const querySnapshot = await db.collection(collectionName).get();
        const documents = [];
        
        querySnapshot.forEach(doc => {
            documents.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return documents;
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
    }
}

/**
 * Get single document by ID
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @returns {Promise} Document data with ID
 */
async function getDocumentById(collectionName, documentId) {
    try {
        const doc = await db.collection(collectionName).doc(documentId).get();
        
        if (!doc.exists) {
            return null;
        }
        
        return {
            id: doc.id,
            ...doc.data()
        };
    } catch (error) {
        console.error('Error fetching document:', error);
        throw error;
    }
}

/**
 * Get documents matching a query
 * @param {string} collectionName - Collection name
 * @param {string} fieldPath - Field to query on
 * @param {string} operator - Query operator (==, <, >, <=, >=, !=, in, array-contains)
 * @param {any} value - Value to match
 * @returns {Promise} Array of matching documents
 */
async function queryDocuments(collectionName, fieldPath, operator, value) {
    try {
        const querySnapshot = await db.collection(collectionName)
            .where(fieldPath, operator, value)
            .get();
        
        const documents = [];
        querySnapshot.forEach(doc => {
            documents.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return documents;
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    }
}

/**
 * Add new document to collection
 * @param {string} collectionName - Collection name
 * @param {object} data - Document data
 * @returns {Promise} Document reference
 */
async function addDocument(collectionName, data) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        const docRef = await db.collection(collectionName).add({
            ...data,
            createdAt: new Date(),
            createdBy: getCurrentUserId()
        });
        
        console.log('Document added:', docRef.id);
        return docRef;
    } catch (error) {
        console.error('Error adding document:', error);
        throw error;
    }
}

/**
 * Update document in collection
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @param {object} data - Data to update
 * @returns {Promise}
 */
async function updateDocument(collectionName, documentId, data) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        await db.collection(collectionName).doc(documentId).update({
            ...data,
            updatedAt: new Date(),
            updatedBy: getCurrentUserId()
        });
        
        console.log('Document updated:', documentId);
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}

/**
 * Delete document from collection
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @returns {Promise}
 */
async function deleteDocument(collectionName, documentId) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        await db.collection(collectionName).doc(documentId).delete();
        console.log('Document deleted:', documentId);
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
}

/**
 * Set up real-time listener on collection
 * @param {string} collectionName - Collection name
 * @param {function} callback - Callback function with documents
 * @returns {function} Unsubscribe function
 */
function onCollectionChange(collectionName, callback) {
    return db.collection(collectionName).onSnapshot(
        (querySnapshot) => {
            const documents = [];
            querySnapshot.forEach(doc => {
                documents.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(documents);
        },
        (error) => {
            console.error('Snapshot error:', error);
        }
    );
}

/**
 * Set up real-time listener on single document
 * @param {string} collectionName - Collection name
 * @param {string} documentId - Document ID
 * @param {function} callback - Callback function with document
 * @returns {function} Unsubscribe function
 */
function onDocumentChange(collectionName, documentId, callback) {
    return db.collection(collectionName).doc(documentId).onSnapshot(
        (doc) => {
            if (doc.exists) {
                callback({
                    id: doc.id,
                    ...doc.data()
                });
            }
        },
        (error) => {
            console.error('Snapshot error:', error);
        }
    );
}

// ========================================
// BATCH OPERATIONS
// ========================================

/**
 * Batch update multiple documents
 * @param {string} collectionName - Collection name
 * @param {array} updates - Array of {id, data} objects
 * @returns {Promise}
 */
async function batchUpdateDocuments(collectionName, updates) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        const batch = db.batch();
        
        updates.forEach(({ id, data }) => {
            const docRef = db.collection(collectionName).doc(id);
            batch.update(docRef, {
                ...data,
                updatedAt: new Date(),
                updatedBy: getCurrentUserId()
            });
        });
        
        await batch.commit();
        console.log('Batch update completed');
    } catch (error) {
        console.error('Batch update error:', error);
        throw error;
    }
}

/**
 * Batch delete multiple documents
 * @param {string} collectionName - Collection name
 * @param {array} documentIds - Array of document IDs
 * @returns {Promise}
 */
async function batchDeleteDocuments(collectionName, documentIds) {
    try {
        if (!isUserAdmin()) {
            throw new Error('Unauthorized: Admin access required');
        }
        
        const batch = db.batch();
        
        documentIds.forEach(id => {
            const docRef = db.collection(collectionName).doc(id);
            batch.delete(docRef);
        });
        
        await batch.commit();
        console.log('Batch delete completed');
    } catch (error) {
        console.error('Batch delete error:', error);
        throw error;
    }
}

// ========================================
// ERROR HANDLING
// ========================================

/**
 * Handle Firebase errors and return user-friendly messages
 * @param {error} error - Firebase error object
 * @returns {string} User-friendly error message
 */
function getErrorMessage(error) {
    const errorMap = {
        'auth/invalid-email': 'Invalid email address',
        'auth/user-disabled': 'User account has been disabled',
        'auth/user-not-found': 'User not found',
        'auth/wrong-password': 'Incorrect password',
        'auth/email-already-in-use': 'Email already in use',
        'auth/weak-password': 'Password is too weak',
        'auth/operation-not-allowed': 'Operation not allowed',
        'permission-denied': 'You do not have permission to perform this action'
    };
    
    return errorMap[error.code] || error.message || 'An error occurred';
}

// Initialize Firebase when scripts are ready
// Try to initialize immediately, then on DOMContentLoaded for safety
function tryInitFirebase() {
    if (typeof firebase !== 'undefined' && firebase.apps !== undefined) {
        initializeFirebase();
    } else {
        // Firebase SDK not loaded yet, retry in 50ms
        setTimeout(tryInitFirebase, 50);
    }
}

// Start initialization attempts as soon as this script loads
tryInitFirebase();

// Also ensure initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (!firebaseInitialized) {
        initializeFirebase();
    }
});
