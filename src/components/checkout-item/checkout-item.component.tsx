import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addItemToCart, removeItemFromCart, removeWholeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton  
}  from './checkout-item.styles'
import { CartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: CartItem
}
const CheckoutItem: FC<CartItemProps> = ({ cartItem }) => {

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price, quantity} = cartItem

  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, cartItem))
  }

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems, cartItem))
  }
  const removeWholeItemHandler = () => {
    dispatch(removeWholeItemFromCart(cartItems, cartItem))
  }
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removeWholeItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem