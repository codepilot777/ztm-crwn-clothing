import React, { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss'

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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          <span>&#10094;</span>
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          <span>&#10095;</span>
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeWholeItemHandler}>
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem