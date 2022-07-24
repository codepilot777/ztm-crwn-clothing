import React, { useState } from 'react';
import { signInWithGooglePopup, signInAuthUserwithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx'

const defaultFormFields = {
  email:'',
  password:'',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user }= await signInAuthUserwithEmailAndPassword(email, password);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break

        case 'auth/user-not-found':
          alert('no user found with this email');
          break
        default:
          console.log(err)
      }
    }
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();

  }
  const handleChange =(e) => {

    const { name, value } = e.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign In with Google</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm