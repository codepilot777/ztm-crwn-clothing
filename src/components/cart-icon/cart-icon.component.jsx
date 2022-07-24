import React, { useContext, useState } from 'react'

import { CartIconContainer, StyledShoppingIcon, ItemCountContainer } from './cart-icon.styles.jsx'
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {

  const { showDropdown, setShowDropdown, cartCount } = useContext(CartContext);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <CartIconContainer onClick={toggleDropdown}>
      <StyledShoppingIcon  />
      <ItemCountContainer>{cartCount}</ItemCountContainer>
    </CartIconContainer>
  )

}

export default CartIcon;