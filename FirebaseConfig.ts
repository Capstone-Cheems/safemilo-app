import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlJBJ4yVpIET3j439D7ONzwmux2j7BZNU",
  authDomain: "safemilo-app-f15cf.firebaseapp.com",
  projectId: "safemilo-app-f15cf",
  storageBucket: "safemilo-app-f15cf.firebasestorage.app",
  messagingSenderId: "287303608250",
  appId: "1:287303608250:web:1333e09756fe70e5e4df83"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);