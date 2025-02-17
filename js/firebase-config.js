import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTm9W1qwFNmWNJOt4bfbkTHIZHfLWnF5g",
    authDomain: "site-25191.firebaseapp.com",
    projectId: "site-25191",
    storageBucket: "site-25191.firebasestorage.app",
    messagingSenderId: "683821139505",
    appId: "1:683821139505:web:2090a0ca432f6eec057710"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
