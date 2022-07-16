import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDCKhqRUVKnPcP3l_BZuL5eUGdLeGBkacQ",
  authDomain: "crwn-clothing-db-1be63.firebaseapp.com",
  projectId: "crwn-clothing-db-1be63",
  storageBucket: "crwn-clothing-db-1be63.appspot.com",
  messagingSenderId: "266206151189",
  appId: "1:266206151189:web:e608ef7c0315be325dc41c",
  measurementId: "G-BL54H070JM"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  //check if user data exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (err) {
      console.log('error creating the user', err.message)
    }
  } return userDocRef;

}