import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCBabfDh6hSwbkrLBCmEfOuEpsGPRZvK-A",
  authDomain: "mediqueue-36734.firebaseapp.com",
  projectId: "mediqueue-36734",
  storageBucket: "mediqueue-36734.firebasestorage.app",
  messagingSenderId: "823593781702",
  appId: "1:823593781702:web:5f4a275c25a9c315d1cac7",
  measurementId: "G-DV70LZWZYQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();