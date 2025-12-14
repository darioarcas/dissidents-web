// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';  // Para autenticación
import 'firebase/firestore';  // Para la base de datos Firestore

// const firebaseConfig = {
//   apiKey: "AIzaSyA9yMMBcNHzIToEkU0AJjsfIECTDohFTWI",
//   authDomain: "cursos-online-groove.firebaseapp.com",
//   projectId: "cursos-online-groove",
//   storageBucket: "cursos-online-groove.firebasestorage.app",
//   messagingSenderId: "446646024581",
//   appId: "1:446646024581:web:e5d046ff07d7d63280ecec"
// };


// El nuevo proyecto en firebase
const firebaseConfig = {
  apiKey: "AIzaSyDWsoIYdNQ4JU5KL1DBdP_FNjSZHnvOwAM",
  authDomain: "dissidents-web-fb0ab.firebaseapp.com",
  projectId: "dissidents-web-fb0ab",
  storageBucket: "dissidents-web-fb0ab.firebasestorage.app",
  messagingSenderId: "767683301892",
  appId: "1:767683301892:web:c60421cc60a0f9ec925b51"
};




// Inicializar Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();

export { googleAuthProvider, db, firebase };
