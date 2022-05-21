// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as firebase from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHkd8gASZOhOKzt9fjGSq-g91yT6Ayl_Q",
    authDomain: "messagefire-1a4e8.firebaseapp.com",
    projectId: "messagefire-1a4e8",
    storageBucket: "messagefire-1a4e8.appspot.com",
    messagingSenderId: "952161926315",
    appId: "1:952161926315:web:4051993306a9832a4c8bee"
};

// Initialize Firebase
export const fb = firebase;
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);