import styled, { css } from 'styled-components';

import { ReactComponent as LeftArrowIcon } from '../../assets/icons/arrow-left.svg';

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
`;

const onlineStyle = css`
  background-color: #27ad3c;
  color: #27ad3c;
`;

const selectStatusStyle = ({ status }) => {
  if (status === null) return spinnerStyle;
  return status ? onlineStyle : offlineStyle;
};

export const ModuleStatus = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid transparent;
  background-color: rgba(0, 0, 0, 0.02);

  ${selectStatusStyle}
`;

export const LoadingSpinner = styled.div`
  width: 15px;
  height: 15px;
  margin-left: 1em;
  border: 2px solid transparent;
  border-radius: 50%;

  ${spinnerStyle}
`;

export const ModuleOverlay = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 1em auto;
`;

export const ModuleHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;

export const ModuleInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const ModuleTitle = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin: 0 0.5em 0 1em;
  display: inline-block;
  color: #00465f;
`;

export const BackIcon = styled(LeftArrowIcon)`
  width: 18px;
  height: 18px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.06);
  }
`;

export const ModuleUndefinedContainer = styled.div`
  width: calc(100% - 2em);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(0, 75, 95, 0.4);
  border-radius: 6px;
  padding: 1em;
  margin: 1em;
`;

export const ModuleUndefinedText = styled.span`
  color: #df5b5b;
  font-weight: bold;
`;

export const ModuleUndefinedTextId = styled.span`
  color: #00465f;
`;
