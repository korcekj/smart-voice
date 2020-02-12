import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserDropdownList = styled.ul`
  position: absolute;
  list-style-type: none;
  top: 50px;
  right: -1px;
  padding: 0.6em 0;
  margin: 0;
  border: 1px solid rgba(0, 75, 95, 0.4);
  border-radius: 6px;
  box-shadow: 1px 1px 2px rgba(0, 75, 95, 0.2);
  background-color: white;
  z-index: 5;
  cursor: default;
`;

export const ListItem = styled.li`
  text-align: center;
`;

export const ListHeading = styled.span`
  display: block;
  font-size: 14px;
  color: rgba(0, 70, 95, 0.8);
  padding: 0.5em 1.7em;
`;

export const ItemLink = styled(Link)`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #00465f;
  padding: 0.5em 1.7em;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 75, 95, 0.1);
  }
`;
