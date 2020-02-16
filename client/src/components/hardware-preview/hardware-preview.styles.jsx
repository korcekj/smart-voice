import styled from 'styled-components';
import { HardwareItemContainer } from '../hardware-item/hardware-item.styles';

export const HardwareOverlay = styled.div`
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: calc(100% - 2em);
    height: 1em;
    margin: 0 1em;
    background: rgb(255, 255, 255);
    z-index: 2;
  }

  &::before {
    top: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &::after {
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

export const HardwareContainer = styled.div`
  max-height: 450px;
  overflow-y: auto;
  padding: 1em;
`;

export const HardwarePreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1em;
  height: 25px;
  width: 100%;
`;

export const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #df5b5b;
  width: 100%;
  height: 100%;
  background-color: #d0e8f0;
  border-radius: 3px;
  padding: 0 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  font-size: 14px;
  margin-left: 1em;
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

export const HardwarePreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    flex-direction: column;

    ${HardwareItemContainer} {
      width: 100%;
    }
  }
`;

export const HardwarePreviewOverlay = styled.div`
  margin: 1em 0;
  display: flex;
  flex-direction: column;
`;
