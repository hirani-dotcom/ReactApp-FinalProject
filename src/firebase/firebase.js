// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword,
        signInWithEmailAndPassword, getAuth } from "firebase/auth";

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
export const doSignOut = () => {auth.signOut();};

export const register = async (name, email, password) => {
  try {
   const res = await createUserWithEmailAndPassword(auth, email, password);
   const user = res.user;
   await addDoc(collection(db, "user"), {
     uid: user.uid, name, authProvider: "local", email
   });
  } catch (error) {
    console.log(error);
      setError(error.code.split('/')[1].split('-').join(" "));
  }
};

export const login = async (email, password) => {
   try {
      await signInWithEmailAndPassword(auth, email, password);
   } catch (error) {
      console.log(error);
      setError(error.code.split('/')[1].split('-').join(" "));
   }
}
