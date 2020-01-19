import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { userActionTypes } from '../../redux/user/user.types';
import { selectError } from '../../redux/user/user.selectors';
import { signUpStart } from '../../redux/user/user.actions';

import { SignUpContainer } from './sign-up-styles';
import { ErrorText, Title } from '../sign-in/sign-in.styles';

const SignUp = ({ signUpStart, error }) => {
  const [credentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const { displayName, email, password, confirmPassword } = credentials;

  useEffect(() => {
    if (error.type === userActionTypes.SIGN_UP_FAILURE)
      setErrorMessage('Nepodarilo sa zaregistrovať');
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Heslá sa nezhodujú');
      return;
    }

    signUpStart(email, password, displayName);
  };

  const handleChange = e => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <SignUpContainer>
      <Title>Chcem sa zaregistrovať</Title>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Meno'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='E-mail'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Heslo'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Zopakuj heslo'
          required
        />
        <CustomButton type='submit'>ZAREGISTROVAŤ</CustomButton>
      </form>
    </SignUpContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpStart: (email, password, displayName) =>
    dispatch(signUpStart({ email, password, displayName }))
});

const mapStateToProps = createStructuredSelector({
  error: selectError
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
