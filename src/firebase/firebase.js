// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';  // Para autenticación
import 'firebase/firestore';  // Para la base de datos Firestore

// const firebaseConfig = {
//     apiKey: "AIzaSyDUy3YmqcmkFDeQ7Op3Pf97SA90t3c0Gkg",
//     authDomain: "gestor-alumnos-groove.firebaseapp.com",
//     projectId: "gestor-alumnos-groove",
//     storageBucket: "gestor-alumnos-groove.firebasestorage.app",
//     messagingSenderId: "755732326995",
//     appId: "1:755732326995:web:b1cf0f8fac6950fc4ff4a6"
// };


// El nuevo proyecto en firebase
const firebaseConfig = {
  apiKey: "AIzaSyA9yMMBcNHzIToEkU0AJjsfIECTDohFTWI",
  authDomain: "cursos-online-groove.firebaseapp.com",
  projectId: "cursos-online-groove",
  storageBucket: "cursos-online-groove.firebasestorage.app",
  messagingSenderId: "446646024581",
  appId: "1:446646024581:web:e5d046ff07d7d63280ecec"
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
