import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuHG6HPca8q4qE0Hp_0cgWIgJZXAilcdo",
  authDomain: "oneup-1123b8b.firebaseapp.com",
  databaseURL: "https://oneup-1123b8b-default-rtdb.firebaseio.com",
  projectId: "oneup-1123b8b",
  storageBucket: "oneup-1123b8b.appspot.com",
  messagingSenderId: "767606765314",
  appId: "1:767606765314:web:ef57203d72697dfd4ff41b",
  measurementId: "G-90RYJX75H4"
};

const app = initializeApp(firebaseConfig);
export const authUser = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const db = getFirestore(app);