import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwc5B06Ow-a9-gQC5xy9ECOejPmx5eJ1o",
  authDomain: "todo-ts-firebase-app.firebaseapp.com",
  projectId: "todo-ts-firebase-app",
  storageBucket: "todo-ts-firebase-app.appspot.com",
  messagingSenderId: "817688850091",
  appId: "1:817688850091:web:1d29e81ba8735ec27a51ee",
  measurementId: "G-GM48L3X7ER",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
