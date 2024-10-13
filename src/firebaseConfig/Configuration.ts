import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvComiuejWWbVdnidsloCxj5NolliMSj0",
  authDomain: "todolist-firebase-app-ce9ca.firebaseapp.com",
  projectId: "todolist-firebase-app-ce9ca",
  storageBucket: "todolist-firebase-app-ce9ca.appspot.com",
  messagingSenderId: "152386919532",
  appId: "1:152386919532:web:b31ecb06aa170965e20c49",
  measurementId: "G-YXQ5DJ5QZN",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
