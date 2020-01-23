import styled from 'styled-components';

export const SpinnerOverlay = styled.div`
  padding: 3em 1em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-top-color: #df5b5b;
  animation: spin 1.5s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.02);
    border: 2px solid transparent;
    border-radius: 50%;
    border-left-color: #e79d45;
    animation: spin 1s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 4px solid transparent;
    border-radius: 50%;
    border-right-color: #ffda2d;
    animation: spin 2s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
