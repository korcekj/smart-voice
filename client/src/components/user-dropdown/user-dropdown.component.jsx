import React from 'react';

import {
  UserDropdownList,
  ListItem,
  ListHeading,
  ItemLink,
} from './user-dropdown.styles';

const UserDropdown = ({ displayName }) => {
  return (
    <UserDropdownList>
      <ListItem>
        <ListHeading>{displayName}</ListHeading>
      </ListItem>
      <ListItem>
        <ItemLink to='/user/settings'>Nastavenia</ItemLink>
      </ListItem>
    </UserDropdownList>
  );
};

export default UserDropdown;
