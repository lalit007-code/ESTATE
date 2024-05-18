// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b7de6.firebaseapp.com",
  projectId: "mern-estate-b7de6",
  storageBucket: "mern-estate-b7de6.appspot.com",
  messagingSenderId: "879444916595",
  appId: "1:879444916595:web:6e6c266e8d275c723e2d06",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
