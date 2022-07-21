import { createContext, useState, useEffect } from 'react';

// helper functions
const addCartItem = (cartItems, productToAdd) => {
  // find cartItems contains productToAdd
  const exisitingCartItem= cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  // If found, increment quantity
  if (exisitingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1} : {cartItem})
  } 
  // return new array with modified cartItems/ new cart tiems
  return [...cartItems, { ...productToAdd, quantity: 1}]
}

export const CartContext = createContext({
  showDropdown: false,
  setShowDropdown: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0 
});

export const CartProvider = ({children}) => {
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartCount, setCartCount ] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const value = {
    showDropdown, setShowDropdown, cartItems, addItemToCart, cartCount
  }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
  
}