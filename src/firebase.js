import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { collection, getDocs, addDoc } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyAsLZNweL1IpLxLQhVtJaWrAa4ki04Lyeo",
    authDomain: "wheres-bosch.firebaseapp.com",
    projectId: "wheres-bosch",
    storageBucket: "wheres-bosch.appspot.com",
    messagingSenderId: "397316014713",
    appId: "1:397316014713:web:42447902c2e1b6eabe4aa8",
};

async function getLocations(db) {
    const data = collection(db, 'data');
    const snapshot = await getDocs(data);
    const locations = snapshot.docs.map(doc => doc.data());
    return locations[0];
}

async function getTimes(db) {
    const timesData = collection(db, 'times');
    const snapshot = await getDocs(timesData);
    const recordedTimes = snapshot.docs.map(doc => doc.data());
}

async function recordTime(db, newTime, username) {
    const docRef = await addDoc(collection(db, 'times'), {
        time: newTime,
        name: username
    });
}

// initialize firebase:
const app = initializeApp(firebaseConfig);

// exports:
export const db = getFirestore(app);
export { getLocations, getTimes, recordTime };