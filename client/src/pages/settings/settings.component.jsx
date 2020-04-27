import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import CustomButtom from '../../components/custom-button/custom-button.component';

import {
  SettingsOverlay,
  SettingsContainer,
  TextField,
  SettingsLink,
} from './settings.styles';

const SettingsPage = ({ user }) => {
  const { displayName, email, createdAt } = user;

  return (
    <SettingsOverlay>
      <SettingsContainer>
        <TextField>Meno a priezvisko</TextField>
        <TextField>{displayName}</TextField>
      </SettingsContainer>
      <SettingsContainer>
        <TextField>Email</TextField>
        <TextField>{email}</TextField>
      </SettingsContainer>
      <SettingsContainer>
        <TextField>Vytvorený dňa</TextField>
        <TextField>
          {moment(createdAt).format('DD. MMMM YYYY, HH:mm')}
        </TextField>
      </SettingsContainer>
      <SettingsLink to='/'>
        <CustomButtom fullwidth>Späť na domovskú stránku</CustomButtom>
      </SettingsLink>
    </SettingsOverlay>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(SettingsPage);
