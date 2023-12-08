
import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCcAGzvLylyf2tW9BaXBpCmIUARhewSyxI",
  authDomain: "fir-todo-app-90eec.firebaseapp.com",
  projectId: "fir-todo-app-90eec",
  storageBucket: "fir-todo-app-90eec.appspot.com",
  messagingSenderId: "668684830317",
  appId: "1:668684830317:web:730d05d28e8ff0513d6164",
  measurementId: "G-Q89F21ETWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
export const googleProvider=new GoogleAuthProvider(app)
