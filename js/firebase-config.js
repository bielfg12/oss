import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


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
