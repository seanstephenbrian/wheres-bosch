import firebase, { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsLZNweL1IpLxLQhVtJaWrAa4ki04Lyeo",
    authDomain: "wheres-bosch.firebaseapp.com",
    projectId: "wheres-bosch",
    storageBucket: "wheres-bosch.appspot.com",
    messagingSenderId: "397316014713",
    appId: "1:397316014713:web:42447902c2e1b6eabe4aa8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default app;