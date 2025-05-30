// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFc22FO9wY-rdB0qMottFko6UtBgOHFps",
  authDomain: "final-web-dev-a1b94.firebaseapp.com",
  projectId: "final-web-dev-a1b94",
  storageBucket: "final-web-dev-a1b94.appspot.com",
  messagingSenderId: "451646535521",
  appId: "1:451646535521:web:088a9dc8cfb218c2de7720"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);