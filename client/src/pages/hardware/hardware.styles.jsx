import styled from 'styled-components';

import { ReactComponent as LeftArrowIcon } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as TrashCanIcon } from '../../assets/icons/trash-can.svg';

export const HardwareOverlay = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 1em auto;
`;

export const HardwareHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`;

export const HardwareTitle = styled.span`
  font-size: 24px;
  font-weight: bold;
  margin: 0 1em;
  display: inline-block;
  color: #00465f;
`;

export const BackIcon = styled(LeftArrowIcon)`
  width: 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.06);
  }
`;

export const DeleteIcon = styled(TrashCanIcon)`
  width: 16px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.06);
  }
`;

export const HardwareUndefinedContainer = styled.div`
  width: calc(100% - 2em);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(0, 75, 95, 0.4);
  border-radius: 6px;
  padding: 1em;
  margin: 1em;
`;

export const HardwareUndefinedText = styled.span`
  color: #df5b5b;
  font-weight: bold;
`;

export const HardwareUndefinedTextId = styled.span`
  color: #00465f;
`;
