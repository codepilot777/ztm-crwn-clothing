import React, { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton  
}  from './checkout-item.styles.jsx'

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart, removeWholeItemFromCart } = useContext(CartContext);

  const { name, imageUrl, price, quantity} = cartItem

  const addItemHandler = () => {
    addItemToCart(cartItem)
  }

  const removeItemHandler = () => {
    removeItemFromCart(cartItem)
  }
  const removeWholeItemHandler = () => {
    removeWholeItemFromCart(cartItem)
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