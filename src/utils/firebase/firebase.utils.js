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
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

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
console.log(firebaseApp);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt : 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey,  objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase() );
    batch.set(docRef, object);
  });
  
  await batch.commit();
  console.log('done!');
  console.log(firebaseApp.name);  // Logs the default app's name


}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  console.log("Email:", email);
			console.log("Password:", password);
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //(userCredential);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {displayName: 'mike'}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

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

};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);


export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  //console.log(collectionRef)
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  // console.log(querySnapshot);
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const {title, items} = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  // console.log(categoryMap);
  // return categoryMap;

}
