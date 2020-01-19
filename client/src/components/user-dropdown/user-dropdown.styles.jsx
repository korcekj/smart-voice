import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserDropdownList = styled.ul`
  position: absolute;
  top: 50px;
  right: 0;
  list-style-type: none;
  padding: 1em;
  margin: 0;
  border: 1px solid rgba(0, 75, 95, 0.4);
  border-radius: 6px;
  box-shadow: 1px 1px 2px rgba(0, 75, 95, 0.2);
  z-index: 2;
`;

export const ListItem = styled.li`
  margin-bottom: 1em;
  text-align: center;
  padding: 0 0.5em;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ListHeading = styled.span`
  font-size: 14px;
  color: rgba(0, 70, 95, 0.8);
`;

export const ItemLink = styled(Link)`
  font-size: 14px;
  font-weight: bold;
  color: #00465f;
  transition: color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;
