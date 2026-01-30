// Firebase Configuration for FutaMart
// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyBUhBRsicJXWSQPlIBW2_ywx8TaJSroR4g",
  authDomain: "dailycontribution-4bca6.firebaseapp.com",
  databaseURL: "https://dailycontribution-4bca6-default-rtdb.firebaseio.com",
  projectId: "dailycontribution-4bca6",
  storageBucket: "dailycontribution-4bca6.appspot.com",
  messagingSenderId: "653066758262",
  appId: "1:653066758262:web:4ced0097861a636f1dd757",
  measurementId: "G-SYE5ZTZ7RP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to the database services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Export for use in other modules
export { db, auth, storage, firebaseConfig };
