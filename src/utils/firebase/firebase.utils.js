import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLqDxPh_SH1eS-auCFaVb8FEZROi2K-1Q",
    authDomain: "e-comm-app-69aaa.firebaseapp.com",
    projectId: "e-comm-app-69aaa",
    storageBucket: "e-comm-app-69aaa.appspot.com",
    messagingSenderId: "918848913930",
    appId: "1:918848913930:web:2d8dd728b99b02473755f3"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'user', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {displayName, email, createdAt});
      } catch (error) {
        console.log("Error creating user:::: " + error.message);
      }
    }

    return userDocRef;
  };