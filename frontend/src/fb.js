import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "<credential>",
  authDomain: "<credential>",
  projectId: "<credential>",
  storageBucket: "<credential>",
  messagingSenderId: "<credential>",
  appId: "<credential>",
  measurementId: "<credential>",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);