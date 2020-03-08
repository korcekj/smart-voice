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
  display: flex;
  flex-direction: column;
`;
