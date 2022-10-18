// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
// ! DO NOT CHANGE THIS FILE.

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyAXp88U3xxBl22pBP3V56fVLTa_WGtdM08",
   authDomain: "t4sg-search-evaluator.firebaseapp.com",
   projectId: "t4sg-search-evaluator",
   storageBucket: "t4sg-search-evaluator.appspot.com",
   messagingSenderId: "793557890114",
   appId: "1:507266397052:web:8b3eefbbf5c6af78bceaf9",
   measurementId: "G-L6H014ZLGT"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;

