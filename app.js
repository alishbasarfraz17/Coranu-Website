import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithPopup, 
    sendEmailVerification, 
    GoogleAuthProvider 
} from "firebase/auth";
import { getFirestore, setDoc, doc, updateDoc, collection, getDocs, query, limit, arrayUnion, arrayRemove, serverTimestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";


const firebaseConfig = {  apiKey: "AIzaSyDiuYNu-Z9Wfwafk203djna7Y-Jqbf-hXk",
authDomain: "login-signup-f5325.firebaseapp.com",
projectId: "login-signup-f5325",
storageBucket: "login-signup-f5325.appspot.com",
messagingSenderId: "40694790995",
appId: "1:40694790995:web:0e3257c9453d4f7fd3bfa6",
measurementId: "G-2QB7H071X4"};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();


onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "dashboard.html";
    }
});


const signUp = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    const name = document.getElementById("name").value;


    if (password !== cPassword) {
        alert("Passwords do not match");
        return;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (!emailRegex.test(email) || !passwordRegex.test(password)) {
        alert("Invalid email or password");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            await sendEmailVerification(user);
            alert("Account created successfully. Please verify your email.");
            const userData = { name, number, email, uId: user.uid };
            await setDoc(doc(db, "users", user.uid), userData);
        })
        .catch((error) => alert(error.message));
};
const logIn = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Login Successful");
            window.location.href = "index.html";
        })
        .catch((error) => alert(error.message));
};


document.getElementById("login_btn")?.addEventListener("click", logIn);
document.getElementById("googleBtn")?.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then(async (result) => {
            const user = result.user;
            const userData = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                image: user.photoURL,
                number: user.phoneNumber
            };
            await setDoc(doc(db, "users", user.uid), userData);
        })
        .catch((error) => console.error(error));
});


export { auth, db, signUp, logIn };

