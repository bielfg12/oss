import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDWvnwrOO435xNODIobQ7nwHckdQKlLaP8",
  authDomain: "discovery-1mhb9l.firebaseapp.com",
  databaseURL: "https://discovery-1mhb9l-default-rtdb.firebaseio.com",
  projectId: "discovery-1mhb9l",
  storageBucket: "discovery-1mhb9l.appspot.com",
  messagingSenderId: "105448739492",
  appId: "1:105448739492:web:283a40f21bba4c47124c31"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
