// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV_v83IQd7bIKRLTEDNymVAdTBt81TtHE",
  authDomain: "sensei-a959b.firebaseapp.com",
  projectId: "sensei-a959b",
  storageBucket: "sensei-a959b.appspot.com",
  messagingSenderId: "807041006434",
  appId: "1:807041006434:web:5953e8295d8a6a61f14a3b",
  measurementId: "G-J2S6F3W1W2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
