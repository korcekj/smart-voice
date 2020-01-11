import React from 'react';

import { ReactComponent as Logo } from '../../assets/icons/logo-circle.svg';

import {
  HeaderContainer,
  LogoWrapper,
  NavContainer,
  NavLink
} from './header.styles';

const Header = () => (
  <HeaderContainer>
    <LogoWrapper>
      <Logo />
    </LogoWrapper>
    <NavContainer>
      <NavLink to='/doc'>Dokumentácia</NavLink>
    </NavContainer>
  </HeaderContainer>
);

export default Header;
