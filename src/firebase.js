import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKJAB201RiJoIcSfmv0jqtCWBG6QCFoyI",
  authDomain: "xmessege-ac776.firebaseapp.com",
  projectId: "xmessege-ac776",
  storageBucket: "xmessege-ac776.appspot.com",
  messagingSenderId: "238806207024",
  appId: "1:238806207024:web:b8bb2d2d02c313336e3bf5",
  measurementId: "G-HG2TP3TQQJ",
};
const provider = new GoogleAuthProvider();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
