import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "riseup-6ba37.firebaseapp.com",
  projectId: "riseup-6ba37",
  storageBucket: "riseup-6ba37.firebasestorage.app",
  messagingSenderId: "257200117170",
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};

const app = initializeApp(firebaseConfig);
export const authUser = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
