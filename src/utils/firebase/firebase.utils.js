import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoGRFT7VvlN4PzBkAi3TUQvLABD5dFlhs",
  authDomain: "ootd-2ffe6.firebaseapp.com",
  projectId: "ootd-2ffe6",
  storageBucket: "ootd-2ffe6.appspot.com",
  messagingSenderId: "284875758722",
  appId: "1:284875758722:web:86af8d8405ac7aed40289b",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//authorization (google provider)
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//getting database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation});
    } catch (err) {
      console.log(err.message);
    }
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => { 
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}