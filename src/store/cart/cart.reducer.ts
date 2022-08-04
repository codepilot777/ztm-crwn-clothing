import { AnyAction } from 'redux';
import { CartItem } from './cart.types'
import { setCartItems, setShowDropdown } from './cart.action';

export type CartState = {
  readonly cartItems: CartItem[];
  readonly showDropdown: boolean;
}
export const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  showDropdown: false,
}

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload
    }
  }
  
  if (setShowDropdown.match(action)){
    return {
      ...state,
      showDropdown: action.payload
    }
  }
  return state
}