import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../store/cart/cart.selector';
import { DropdownContainer, EmptyMessage, CartItemsContainer } from './cart-dropdown.styles'

const CartDropdown = () => {
  
  const navigate = useNavigate();
  
  const cartItems = useSelector(selectCartItems);
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