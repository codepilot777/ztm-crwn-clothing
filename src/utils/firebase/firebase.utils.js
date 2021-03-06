import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  
  objectsToAdd.forEach(obj => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
    
  })
  await batch.commit();
  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc
  }, {})

  return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return ;
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef);

  //check if user data exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (err) {
      console.log('error creating the user', err.message)
    }
  } return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserwithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = async (callback) => onAuthStateChanged(auth, callback);