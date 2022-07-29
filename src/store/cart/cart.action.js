import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

// helper functions
const addCartItem = (cartItems, productToAdd) => {
  // find cartItems contains productToAdd
  const exisitingCartItem= cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  // If found, increment quantity
  if (exisitingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1} : cartItem)
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
    cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
  )
}
// helper function 3
const removeWholeCartItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeWholeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeWholeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const setShowDropdown = (bool) => (
  createAction(CART_ACTION_TYPES.SET_SHOW_DROPDOWN, bool) 
)

export const setCartItems = (cartItems) => (
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
)