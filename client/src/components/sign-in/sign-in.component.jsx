import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { userActionTypes } from '../../redux/user/user.types';
import { selectError } from '../../redux/user/user.selectors';

import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

import {
  SignInContainer,
  ButtonsContainer,
  Title,
  ErrorText
} from './sign-in.styles';

const SignIn = ({ googleSignInStart, emailSignInStart, error }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const { email, password } = credentials;

  useEffect(() => {
    if (error.type === userActionTypes.SIGN_IN_FAILURE)
      setErrorMessage('Nepodarilo sa prihlásiť');
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();

    emailSignInStart(email, password);
  };

  const handleChange = e => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <SignInContainer>
      <Title>Už mám účet vytvorený</Title>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          value={email}
          label='E-mail'
          handleChange={handleChange}
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          label='Heslo'
          handleChange={handleChange}
          required
        />

        <ButtonsContainer>
          <CustomButton type='submit'>PRIHLÁSIŤ</CustomButton>
          <CustomButton
            type='button'
            isGoogleSignIn
            onClick={googleSignInStart}
          >
            PRIHLÁSIŤ SA CEZ GOOGLE
          </CustomButton>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

const mapStateToProps = createStructuredSelector({
  error: selectError
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
