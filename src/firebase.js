// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getAuth, signInAnonymously } from "firebase/auth";

const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    console.log("Signed in anonymously ✅");
  })
  .catch((error) => {
    console.error("Anonymous sign-in failed:", error);
  });
  
const firebaseConfig = {
  apiKey: "AIzaSyDt3jalGC3bPfmee4mcaIV8jWlh1yWQw04",
  authDomain: "movieratings-c1445.firebaseapp.com",
  projectId: "movieratings-c1445",
  storageBucket: "movieratings-c1445.appspot.com",
  messagingSenderId: "193250184547",
  appId: "1:193250184547:web:a440429e8918152e219756",
  measurementId: "G-DJB83QFVQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
