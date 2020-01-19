import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import UserDropdown from '../user-dropdown/user-dropdown.component';

import {
  UserHeaderOverlay,
  UserContainer,
  UserIcon,
  UserEmail,
  ArrowDownIcon,
  ArrowUpIcon
} from './user-header.styles';

const UserHeader = ({ currentUser }) => {
  const [isHidden, setIsHidden] = useState(true);

  const { email, displayName } = currentUser;

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <UserHeaderOverlay>
      <UserContainer>
        <UserIcon />
        <UserEmail>{email}</UserEmail>
        {isHidden ? (
          <ArrowDownIcon onClick={toggleHidden} />
        ) : (
          <ArrowUpIcon onClick={toggleHidden} />
        )}
        {!isHidden && <UserDropdown displayName={displayName} />}
      </UserContainer>
    </UserHeaderOverlay>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(UserHeader);
