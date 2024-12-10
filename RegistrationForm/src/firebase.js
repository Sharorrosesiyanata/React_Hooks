// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIaQhTOgPXoZNzUCAi8KjpxvWiAaLwSBk",
  authDomain: "register-form-88c1c.firebaseapp.com",
  projectId: "register-form-88c1c",
  storageBucket: "register-form-88c1c.firebasestorage.app",
  messagingSenderId: "119702303230",
  appId: "1:119702303230:web:7c7e0e48b729aadefd50af",
  measurementId: "G-FKP6NC79XX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
