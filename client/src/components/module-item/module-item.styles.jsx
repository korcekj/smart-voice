import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as CpuIcon } from '../../assets/icons/cpu.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';

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
  margin: 0 1em 1em 0;
  transition: transform 0.4s ease-in-out;
`;

export const DeleteIcon = styled(TrashIcon)`
  display: none;
  width: 32px;
  position: absolute;
  top: 50%;
  left: -16px;
  transform: translateY(-50%);
  border: 2px solid #99b7bf;
  border-radius: 50%;
  transition: border-color 0.2s ease-in-out;
  z-index: 3;

  &:hover {
    border-color: #00465f;
  }
`;

export const ErrorMessage = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  padding: 0 2em;
  width: 100%;
  height: 33%;
  font-weight: bold;
  font-size: 14px;
  color: #df5b5b;
  border-top: 2px solid rgba(0, 75, 95, 0.4);
  background-color: #d0e8f0;
  border-radius: 0 0 6px 6px;
  z-index: 2;
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
  transition: all 0.4s ease-in-out;

  &:hover,
  &:focus {
    border-color: #5c99af;
    padding-left: 2em;
  }

  &:hover ${ModuleIcon}, &:focus ${ModuleIcon} {
    transform: scale(0.96);
  }

  &:hover ${ItemTitle}, &:focus ${ItemTitle} {
    transform: scale(1.02);
  }

  &:hover ${DeleteIcon}, &:focus ${DeleteIcon} {
    display: block;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
