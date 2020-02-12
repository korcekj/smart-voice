import styled, { css } from 'styled-components';

import { ReactComponent as Led } from '../../assets/icons/led.svg';
import { ReactComponent as Remote } from '../../assets/icons/remote.svg';
import { ReactComponent as Trash } from '../../assets/icons/trash.svg';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';

const iconStyle = css`
  width: 50px;
  position: absolute;
  top: 50%;
  right: 1.5em;
  transform: translateY(-50%);
  transition: transform 0.4s ease-in-out;
`;

const actionIconStyle = css`
  display: none;
  width: 32px;
  position: absolute;
  top: 50%;
  left: -16px;
  transform: translateY(-50%);
  border: 2px solid #99b7bf;
  border-radius: 50%;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #00465f;
  }
`;

export const ItemTitle = styled.span`
  font-size: 20px;
  color: #00465f;
  font-weight: bold;
  margin-bottom: 1em;
  transition: transform 0.4s ease-in-out;
`;

export const ItemSubtitle = styled.span`
  font-size: 14px;
  color: #5c99af;
  font-weight: bold;
`;

export const LedIcon = styled(Led)`
  ${iconStyle}
`;

export const RemoteIcon = styled(Remote)`
  ${iconStyle}
`;

export const AddIcon = styled(Plus)`
  ${actionIconStyle}
`;

export const DeleteIcon = styled(Trash)`
  ${actionIconStyle}
`;

export const HardwareItemContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5em;
  border: 2px solid rgba(0, 75, 95, 0.4);
  border-radius: 6px;
  margin-bottom: 1.5em;
  transition: all 0.4s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    border-color: #5c99af;
    padding-left: 2em;
  }

  &:hover ${RemoteIcon}, &:focus ${RemoteIcon} {
    transform: translateY(-50%) scale(0.96);
  }

  &:hover ${LedIcon}, &:focus ${LedIcon} {
    transform: translateY(-50%) scale(0.96);
  }

  &:hover ${ItemTitle}, &:focus ${ItemTitle} {
    transform: scale(1.02);
  }

  &:hover ${AddIcon}, &:focus ${AddIcon} {
    display: block;
  }

  &:hover ${DeleteIcon}, &:focus ${DeleteIcon} {
    display: block;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;
