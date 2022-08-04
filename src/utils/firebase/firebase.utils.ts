import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, NextOrObserver } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'
import { Category } from '../../store/categories/category.types';

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

export type ObjectToAdd = {
  title: string
}
export const addCollectionAndDocuments = async <T extends ObjectToAdd> (collectionKey: string, objectsToAdd: T[]): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  
  objectsToAdd.forEach(obj => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
    
  })
  await batch.commit();
  console.log('done')
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
}

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
      console.log('error creating the user', err)
    }
  } return userSnapshot as QueryDocumentSnapshot<UserData>;

}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserwithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = async (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth)
      },
      reject
    )
  })
}