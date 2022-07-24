import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import { CartContext } from '../../contexts/cart.context';

import { DropdownContainer, EmptyMessage, CartItemsContainer } from './cart-dropdown.styles.jsx'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);  
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('checkout')
  }
  
  return (
    <DropdownContainer>
      <CartItemsContainer>
        {
          cartItems.length ? (cartItems.map(cartItem => <CartItem cartItem={cartItem} key={cartItem.id}/>)) : (<EmptyMessage>Your cart is empty</EmptyMessage>)
        }
      </CartItemsContainer>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </DropdownContainer>
  )
}

export default CartDropdown