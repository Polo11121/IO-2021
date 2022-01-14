import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALo1VwIIk7THPRpUdljbK2WK21Kt_kOV8",
  authDomain: "kkjs-951af.firebaseapp.com",
  projectId: "kkjs-951af",
  storageBucket: "kkjs-951af.appspot.com",
  messagingSenderId: "221622318409",
  appId: "1:221622318409:web:f1de82e3facad5528f9698",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();

export const auth = getAuth();
