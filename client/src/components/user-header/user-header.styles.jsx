import styled from 'styled-components';

import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/icons/arrow-up.svg';

export const UserHeaderOverlay = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const UserContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 45px;
  padding: 0 1em;
  border: 1px solid rgba(0, 75, 95, 0.4);
  border-radius: 6px;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: #5c99af;
  }
`;

export const UserIcon = styled(User)`
  width: 30px;

  &:hover {
    animation: rotate 1.5s ease-in-out;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const UserEmail = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: #00465f;
  margin: 0 1em;
`;

export const ArrowDownIcon = styled(ArrowDown)`
  width: 12px;
  cursor: pointer;
`;

export const ArrowUpIcon = styled(ArrowUp)`
  width: 12px;
  cursor: pointer;
`;
