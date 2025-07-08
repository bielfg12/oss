const firebaseConfig = {
  apiKey: "AIzaSyBLZW1wp5w3MAuWyBqglNkKwDRlrsa8Ia8",
  authDomain: "site-xtvsvs.firebaseapp.com",
  projectId: "site-xtvsvs",
  storageBucket: "site-xtvsvs.appspot.com",
  messagingSenderId: "885976868605",
  appId: "1:885976868605:web:a27cd91251186e1d148094"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

// Definindo db global para uso em script.js
window.db = firebase.firestore();
