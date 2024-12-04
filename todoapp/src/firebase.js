// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaxHqMwOSKoA7IZ8xMehXmOtxzrrW7ipw",
  authDomain: "to-do-application-9c23d.firebaseapp.com",
  projectId: "to-do-application-9c23d",
  storageBucket: "to-do-application-9c23d.firebasestorage.app",
  messagingSenderId: "543140912687",
  appId: "1:543140912687:web:b10c8edbc295215cb0b0da",
  measurementId: "G-8PS0VZCY35"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
