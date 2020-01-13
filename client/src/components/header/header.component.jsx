import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/icons/logo-circle.svg';

import {
  HeaderContainer,
  LogoWrapper,
  NavContainer,
  NavLinkElement
} from './header.styles';

const Header = () => (
  <HeaderContainer>
    <LogoWrapper>
      <Link to='/'>
        <Logo />
      </Link>
    </LogoWrapper>
    <NavContainer>
      <NavLinkElement to='/' exact activeClassName='active'>
        Domov
      </NavLinkElement>
      <NavLinkElement to='/login' activeClassName='active'>
        Prihlásenie
      </NavLinkElement>
    </NavContainer>
  </HeaderContainer>
);

export default Header;
