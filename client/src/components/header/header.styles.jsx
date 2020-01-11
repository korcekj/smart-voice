import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 2em;
  background: rgb(255, 241, 175);
  background: linear-gradient(
    90deg,
    rgba(255, 241, 175, 1) 0%,
    rgba(255, 241, 175, 1) 20%,
    rgba(255, 252, 236, 1) 100%
  );
`;

export const LogoWrapper = styled.div`
  width: 60px;
  margin-right: 1em;
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavLink = styled(Link)`
  font-weight: bold;
  margin-right: 2em;

  &:last-child {
    margin-right: 0;
  }
`;
