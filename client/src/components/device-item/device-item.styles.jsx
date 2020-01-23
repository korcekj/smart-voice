import styled, { css } from 'styled-components';

import { ReactComponent as WifiIcon } from '../../assets/icons/wifi.svg';

const spinnerStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1em;
  width: 15px;
  height: 15px;
  border: 2px solid rgba(0, 75, 95, 0.4);
  border-top-color: #00465f;
  border-radius: 50%;
  animation: spin 1s infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const isLoadingStyle = ({ isLoading }) => {
  return isLoading ? spinnerStyle : '';
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
`;

export const DeviceIcon = styled(WifiIcon)`
  width: 16px;
  margin-right: 0.5em;
  transform: rotate(45deg);
`;

export const SpinnerIcon = styled.div`
  ${isLoadingStyle}
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
  height: 50%;
  font-weight: bold;
  font-size: 14px;
  color: #df5b5b;
  background-color: #d0e8f0;
  border-radius: 0 0 6px 6px;
  z-index: 2;
`;

export const ItemSubtitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeviceItemContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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

  &:hover ${ItemTitle}, &:focus ${ItemTitle} {
    transform: scale(1.02);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
