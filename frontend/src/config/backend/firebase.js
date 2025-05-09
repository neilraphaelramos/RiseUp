import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "oneup-1123b8b.firebaseapp.com",
  databaseURL: "https://oneup-1123b8b-default-rtdb.firebaseio.com",
  projectId: "oneup-1123b8b",
  storageBucket: "oneup-1123b8b.appspot.com",
  messagingSenderId: "767606765314",
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
export const authUser = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const db = getFirestore(app);