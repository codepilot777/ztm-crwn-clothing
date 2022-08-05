import { CategoryItem } from '../categories/category.types';
import { CartItem, CART_ACTION_TYPES } from './cart.types';
import { createAction, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer.utils';

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export type SetShowDropdown = ActionWithPayload<CART_ACTION_TYPES.SET_SHOW_DROPDOWN, boolean>

export type CartAction = SetCartItems | SetShowDropdown

// helper functions
const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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
const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  // find the cartItem to remove
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)
  // if the quantity is equal to 1, remove that item from the cart
  if(existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }
  // else decrease the quantity by 1
  return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
  )
}
// helper function 3
const removeWholeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

export const setShowDropdown = withMatcher((bool: boolean): SetShowDropdown => (
  createAction(CART_ACTION_TYPES.SET_SHOW_DROPDOWN, bool) 
  ))
  
  export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => (
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
    ))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems)
}

export const removeWholeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCartItems = removeWholeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems)
}