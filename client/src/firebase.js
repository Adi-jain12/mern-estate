// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-cd704.firebaseapp.com",
  projectId: "mern-estate-cd704",
  storageBucket: "mern-estate-cd704.appspot.com",
  messagingSenderId: "650471772191",
  appId: "1:650471772191:web:4f3949caaaa84c9e8bc52a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
