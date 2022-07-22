import React, { useContext, useState } from 'react'

import './cart-icon.styles.scss'
import { CartContext } from '../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const CartIcon = () => {

  const { showDropdown, setShowDropdown, cartCount } = useContext(CartContext);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="cart-icon-container" onClick={toggleDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  )

}

export default CartIcon;