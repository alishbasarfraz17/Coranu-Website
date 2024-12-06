import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyDiuYNu-Z9Wfwafk203djna7Y-Jqbf-hXk",
    authDomain: "login-signup-f5325.firebaseapp.com",
    projectId: "login-signup-f5325",
    storageBucket: "login-signup-f5325.appspot.com",
    messagingSenderId: "40694790995",
    appId: "1:40694790995:web:0e3257c9453d4f7fd3bfa6",
    measurementId: "G-2QB7H071X4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


export { auth, db, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup };

