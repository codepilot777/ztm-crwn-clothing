import React, { useState, FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

import { BUTTON_TYPE_CLASSES} from '../button/button.component';

import { PaymentFormContainer,FormContainer, PaymentButton } from './payment-form.styles';
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

const isValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const [ processingPayment, setProcessingPayment ] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements ) return;
    
    setProcessingPayment(true);
    
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amount * 100
      })
    }).then(res => res.json())
    const clientSecret = response.paymentIntent.client_secret;
    
    const cardDetails = elements.getElement(CardElement);
    if (!isValidCardElement(cardDetails)) return;
    
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        }
      }
    })
    
    setProcessingPayment(false);
    if (paymentResult.error) {
      alert('Payment Error')
    } else {
      if(paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment succeed')
      }
    }
  }
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={processingPayment}>Pay now</PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm