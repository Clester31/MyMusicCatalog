// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw8RhKCxwoxbXC6OwxLiiokl-pAGVV6as",
  authDomain: "my-m-b43e4.firebaseapp.com",
  projectId: "my-m-b43e4",
  storageBucket: "my-m-b43e4.firebasestorage.app",
  messagingSenderId: "911135372059",
  appId: "1:911135372059:web:30e0947083caeb0e3c19be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);