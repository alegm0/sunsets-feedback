// lib/auth.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDG798w6agqB_bKJDMYlG8-ixsACgx5DYw",
  authDomain: "sunsets-feedback.firebaseapp.com",
  projectId: "sunsets-feedback",
  storageBucket: "sunsets-feedback.firebasestorage.app",
  messagingSenderId: "119088001424",
  appId: "1:119088001424:web:2284f89122f11969910315",
 
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
