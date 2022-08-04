import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { selectCartCount, selectShowDropdown } from '../../store/cart/cart.selector';
import { setShowDropdown } from '../../store/cart/cart.action';
import { CartIconContainer, StyledShoppingIcon, ItemCountContainer } from './cart-icon.styles.jsx';

const CartIcon = () => {
  const dispatch = useDispatch();

  const cartCount =  useSelector(selectCartCount);
  const showDropdown = useSelector(selectShowDropdown);
  const toggleDropdown = () => dispatch(setShowDropdown(!showDropdown))

  return (
    <CartIconContainer onClick={toggleDropdown}>
      <StyledShoppingIcon  />
      <ItemCountContainer>{cartCount}</ItemCountContainer>
    </CartIconContainer>
  )

}

export default CartIcon;