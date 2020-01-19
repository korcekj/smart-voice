import styled from 'styled-components';

export const ModulePreviewOverlay = styled.div`
  position: relative;
  width: 50%;

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

export const ModulePreviewContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  padding: 1em;
`;
