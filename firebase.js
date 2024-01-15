import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';




const firebaseConfig = {
  apiKey: "AIzaSyB_gO5wAHj1akB5w85ZE-eVmBVomjDv9-o",
  authDomain: "facebook-ffb89.firebaseapp.com",
  projectId: "facebook-ffb89",
  storageBucket: "facebook-ffb89.appspot.com",
  messagingSenderId: "30159974879",
  appId: "1:30159974879:web:7169ea58fc98efe686946a"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage, app };