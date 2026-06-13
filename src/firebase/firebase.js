// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwUoevJmhv7PY1Vsd3AhOke8mwR80eNx8",
    authDomain: "movie-search-691f2.firebaseapp.com",
    projectId: "movie-search-691f2",
    storageBucket: "movie-search-691f2.firebasestorage.app",
    messagingSenderId: "25878031347",
    appId: "1:25878031347:web:19dc1a2cc65a2e5b8f4086",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
