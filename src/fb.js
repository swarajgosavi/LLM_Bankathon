import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0SIzxO-ahye2EKhRe3uATzCC-ZiwRNoo",
  authDomain: "bankathon-df037.firebaseapp.com",
  projectId: "bankathon-df037",
  storageBucket: "bankathon-df037.appspot.com",
  messagingSenderId: "248387078665",
  appId: "1:248387078665:web:c7de85901a2df7fa0e46d8",
  measurementId: "G-BW9ECXDRTV",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);