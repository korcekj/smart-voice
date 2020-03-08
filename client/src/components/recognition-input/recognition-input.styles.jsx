import styled, { css } from 'styled-components';

import { ReactComponent as MicrophoneOnIcon } from '../../assets/icons/microphone-on.svg';
import { ReactComponent as MicrophoneOffIcon } from '../../assets/icons/microphone-off.svg';
import { ReactComponent as RemoveIcon } from '../../assets/icons/remove.svg';

const iconStyles = css`
  width: 25px;
  height: 25px;
  margin: 0 1em;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const RecognitionContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #1e6984;
  border-radius: 6px;
  margin: 1em;
  height: 60px;
  color: #00465f;
`;

export const TranscriptContainer = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1em;
  border-left: 1px solid #d0e8f0;
`;

export const BouncingDot = styled.span`
  display: inline-block;
  position: relative;
  font-weight: bold;
  margin: 0 0.1em;
  animation: bounce 1s infinite;
  animation-delay: ${({ delay }) => (delay ? delay + 's' : 0)};

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-0.06em);
    }
  }
`;

export const MicrophoneOn = styled(MicrophoneOnIcon)`
  ${iconStyles}
`;

export const MicrophoneOff = styled(MicrophoneOffIcon)`
  ${iconStyles}
`;

export const RemoveButton = styled(RemoveIcon)`
  ${iconStyles}
`;
