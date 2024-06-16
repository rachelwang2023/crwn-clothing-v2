// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider,createUserWithEmailAndPassword,  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged

} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDavvF8aGJFOAgwejMNUcKrTl1HKQpPJCo",
  authDomain: "crwn-clothing-db-69e58.firebaseapp.com",
  projectId: "crwn-clothing-db-69e58",
  storageBucket: "crwn-clothing-db-69e58.appspot.com",
  messagingSenderId: "944042676429",
  appId: "1:944042676429:web:f6ba6eac966a642e22d984"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : 'select_account'
});



export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  console.log("Email:", email);
			console.log("Password:", password);
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {displayName: 'mike'}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);


  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {displayName, email, createAt, ...additionalInformation})
      console.log(`User document created for ${email} (${displayName})`);

    } catch (error){
      console.error('Error creating the user document:', error.message);

    }

   }else{
    console.warn(`User ${userAuth.email} (${userAuth.displayName}) already exists`);

   }
  // if user data exists

  // if user data 


  //return userDataRef
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);



