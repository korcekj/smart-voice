import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SettingsOverlay = styled.div`
  display: flex;
  margin: 1em auto;
  max-width: 1100px;
  padding: 1em;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const SettingsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1.5em;
`;

export const TextField = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 1em 1.5em;
  border: 1px solid #00465f;
  border-radius: 6px;
  color: #00465f;

  &:first-child {
    font-weight: bold;
    margin-right: 2%;
    width: 38%;
  }

  &:nth-child(2) {
    width: 60%;
  }
`;

export const SettingsLink = styled(Link)`
  display: block;
  width: 100%;
`;
