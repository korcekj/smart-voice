import styled from 'styled-components';

export const ModulesPreviewOverlay = styled.div`
  position: relative;
  width: 48%;
  margin-right: 0 2%;

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

export const ModulesPreviewContainer = styled.div`
  max-height: 450px;
  overflow-y: auto;
  padding: 1em;
`;

export const NoModulesContainer = styled.div`
  width: 100%;
  padding: 1em;
  border: 2px solid rgba(0, 75, 95, 0.4);
  border-radius: 6px;
  text-align: center;
`;

export const NoModulesTitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #00465f;
  line-height: 2em;
  font-weight: bold;
`;
