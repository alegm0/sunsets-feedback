// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";



// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDG798w6agqB_bKJDMYlG8-ixsACgx5DYw",
  authDomain: "sunsets-feedback.firebaseapp.com",
  projectId: "sunsets-feedback",
  storageBucket: "sunsets-feedback.firebasestorage.app",
  messagingSenderId: "119088001424",
  appId: "1:119088001424:web:2284f89122f11969910315",
  measurementId: "G-98KZKP7VHQ"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };

