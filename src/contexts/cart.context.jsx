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

// helper function 2
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cartItem to remove
  const exisitngCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
  // if the quantity is equal to 1, remove that item from the cart
  if(exisitngCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }
  // else decrease the quantity by 1
  return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : {cartItem} 
  )
}
// helper function 3
const removeWholeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

export const CartContext = createContext({
  showDropdown: false,
  setShowDropdown: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeWholeItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const CartProvider = ({children}) => {
  const [ showDropdown, setShowDropdown ] = useState(false);
  const [ cartItems, setCartItems ] = useState([]);
  const [ cartCount, setCartCount ] = useState(0);
  const [ cartTotal, setCartTotal ] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    setCartTotal(newCartTotal);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const removeWholeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeWholeCartItem(cartItems, cartItemToRemove))
  }

  const value = {
    showDropdown, setShowDropdown, cartItems, addItemToCart, removeItemFromCart, removeWholeItemFromCart, cartCount, cartTotal
  }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
  
}