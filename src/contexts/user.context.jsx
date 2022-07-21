import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

// as the actual you want to access 
export const UserContext = createContext({
  currentUser: null,
  setCurrent: () => null,
});


export const UserProvider = ({ children}) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {

    const unsubscribeFun = () => {
      const unsubscribe = onAuthStateChangedListener((user) => {
        setCurrentUser(user)
        if (user) {
          createUserDocumentFromAuth(user)
        }
        setCurrentUser(user)
      })
      return unsubscribe
    }
    unsubscribeFun();
  }, [])

  const value = { currentUser, setCurrentUser};
  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}