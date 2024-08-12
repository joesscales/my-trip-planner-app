// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCdSdfqXSmy4C1_R0Ljs8j2dPKngCW_r1g",
  authDomain: "my-trip-planner-e8dbd.firebaseapp.com",
  projectId: "my-trip-planner-e8dbd",
  storageBucket: "my-trip-planner-e8dbd.appspot.com",
  messagingSenderId: "109994167190",
  appId: "1:109994167190:web:7ab459b67abf2962c2abb7",
  measurementId: "G-Q1KDL01H2Q"
};


export const initApp = initializeApp(firebaseConfig);
export const initAnalytics = getAnalytics(initApp);
