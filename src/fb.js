// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
// import { getAnalytics } from "firebase/analytics"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0SIzxO-ahye2EKhRe3uATzCC-ZiwRNoo",
  authDomain: "bankathon-df037.firebaseapp.com",
  projectId: "bankathon-df037",
  storageBucket: "bankathon-df037.appspot.com",
  messagingSenderId: "248387078665",
  appId: "1:248387078665:web:c7de85901a2df7fa0e46d8",
  measurementId: "G-BW9ECXDRTV",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);