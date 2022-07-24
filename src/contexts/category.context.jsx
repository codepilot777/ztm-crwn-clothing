import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

export const CategoryContext = createContext({
  categoryMap: [],
});

export const CategoryProvider = ({ children }) => {
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoryMap(categoryMap);
    }
    getCategoriesMap()
  }, [])

  const [ categoryMap, setCategoryMap ] = useState({});
  const value = { categoryMap } 

  return (
    <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
  )
}