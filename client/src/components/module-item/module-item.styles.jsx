import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as CpuIcon } from '../../assets/icons/cpu.svg';

const spinnerStyle = css`
  border-top-color: #00465f;
  animation: spin 1s infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const offlineStyle = css`
  background-color: #df5b5b;
  color: #df5b5b;

  &:after {
    content: 'Offline';
  }
`;

const onlineStyle = css`
  background-color: #27ad3c;
  color: #27ad3c;

  &:after {
    content: 'Online';
  }
`;

const selectStatusStyle = ({ status }) => {
  if (status === null) return spinnerStyle;
  return status ? onlineStyle : offlineStyle;
};

export const ItemTitle = styled.span`
  font-size: 20px;
  color: #00465f;
  font-weight: bold;
  margin-bottom: 0.5em;
  transition: transform 0.4s ease-in-out;
`;

export const ItemSubtitle = styled.span`
  font-size: 14px;
  color: #5c99af;
  font-weight: bold;
  margin-bottom: 1em;
`;

export const ModuleStatus = styled.div`
  position: relative;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid transparent;
  background-color: rgba(0, 0, 0, 0.02);

  &:after {
    font-size: 12px;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 2em;
    transform: translateY(-50%);
  }

  ${selectStatusStyle}
`;

export const ModuleIcon = styled(CpuIcon)`
  width: 50px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1em;
  transition: transform 0.4s ease-in-out;
`;

export const ModuleItemContainer = styled(Link)`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em;
  border: 2px solid rgba(0, 75, 95, 0.4);
  border-radius: 6px;
  margin-bottom: 1.5em;
  cursor: pointer;
  transition: border-color 0.4s ease-in-out;

  &:hover,
  &:focus {
    border-color: #5c99af;
  }

  &:hover ${ModuleIcon}, &:focus ${ModuleIcon} {
    transform: scale(0.96);
  }

  &:hover ${ItemTitle}, &:focus ${ItemTitle} {
    transform: scale(1.02);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
