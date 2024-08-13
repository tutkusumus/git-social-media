// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "git-social-5b5e3.firebaseapp.com",
  projectId: "git-social-5b5e3",
  storageBucket: "git-social-5b5e3.appspot.com",
  messagingSenderId: "98349943527",
  appId: "1:98349943527:web:a174bcceb565b48dd43042"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);