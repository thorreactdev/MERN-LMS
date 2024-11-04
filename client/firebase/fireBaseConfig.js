// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIW5HteL-aeLPqDSjasGGjpRnGe_baKL4",
    authDomain: "mern-lms-1c5dd.firebaseapp.com",
    projectId: "mern-lms-1c5dd",
    storageBucket: "mern-lms-1c5dd.appspot.com",
    messagingSenderId: "122987399529",
    appId: "1:122987399529:web:a453a9bad0aed3830215f8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);