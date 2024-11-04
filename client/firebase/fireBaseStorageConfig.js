// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBvuR1BU-VuOogati-fBR7BYd5G-h8Tkfs",
    authDomain: "mern-lms-storage.firebaseapp.com",
    projectId: "mern-lms-storage",
    storageBucket: "mern-lms-storage.firebasestorage.app",
    messagingSenderId: "857140844796",
    appId: "1:857140844796:web:da8883c38d6ec93a4a1f79"
};

// Initialize Firebase
export const firebaseStorageApp = initializeApp(firebaseConfig);