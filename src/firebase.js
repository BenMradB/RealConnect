import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBYPHtQeynVi_l9Ps8bNMNtAqwime7VyP4",
  authDomain: "chatapp-d20f0.firebaseapp.com",
  projectId: "chatapp-d20f0",
  storageBucket: "chatapp-d20f0.appspot.com",
  messagingSenderId: "25595355602",
  appId: "1:25595355602:web:82e448bb88808282ece80b",
  measurementId: "G-1Q4YV7JWP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Create a root reference
const storage = getStorage();

const db = getFirestore();

export { app, auth, storage, db };
