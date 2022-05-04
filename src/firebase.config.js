import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAM0QjS-FCU9--grOig1wLKEAEDO-3dmPk",
  authDomain: "auth-426d8.firebaseapp.com",
  projectId: "auth-426d8",
  storageBucket: "auth-426d8.appspot.com",
  messagingSenderId: "826389300520",
  appId: "1:826389300520:web:735e795dcb55ab612cfc1d",
  measurementId: "G-FC9P2GR4TW"
};

  const app =initializeApp(firebaseConfig);
  export const db =getFirestore();
  
