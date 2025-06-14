// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9gycJnG1u4gIi2ADZpW6rvmyZHZk3PYA",
  authDomain: "tudientrung.firebaseapp.com",
  projectId: "tudientrung",
  storageBucket: "tudientrung.firebasestorage.app",
  messagingSenderId: "226406976272",
  appId: "1:226406976272:web:694ba67798203a615ab395"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
