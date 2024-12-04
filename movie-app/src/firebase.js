// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCFaptlyiPn_KBiEmM-RF2_aOpYb5vUmoc",
    authDomain: "rose-movie-app.firebaseapp.com",
    projectId: "rose-movie-app",
    storageBucket: "rose-movie-app.firebasestorage.app",
    messagingSenderId: "1007865799321",
    appId: "1:1007865799321:web:d9eca8052d95b102bb4e08",
    measurementId: "G-4WJNDZWLF6"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
