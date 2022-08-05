import React, { useState, FormEvent, ChangeEvent  } from 'react';
import { useDispatch } from 'react-redux';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { SignUpContainer } from './sign-up-form.styes';

import { signUpStart } from '../../store/user/user.action';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name , value } = e.target;
    setFormFields({
      ...formFields, [name]: value
    })
  }

  const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return ;
    }

    try {
      dispatch(signUpStart(email, password, displayName))
      resetFormFields();
    } catch (err) {
      if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS){
        alert('email already in use');
      } else {
        console.log(err)
      }
    }
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign Up With your Email and Password</span>
      <form onSubmit={handleSumbit}>
        <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />
        <FormInput label='Email' required type="email" value={email} onChange={handleChange} name="email" />
        <FormInput label='Password' required type="password" value={password} onChange={handleChange} name="password" />
        <FormInput label='Confirm Password' required type="password" value={confirmPassword} onChange={handleChange} name="confirmPassword" />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm