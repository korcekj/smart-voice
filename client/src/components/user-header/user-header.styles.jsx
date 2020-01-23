import styled from 'styled-components';

import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../assets/icons/arrow-up.svg';

export const UserHeaderOverlay = styled.div`
  display: flex;
  justify-content: flex-end;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1em;
`;

export const UserContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  padding: 0 1em;
  border: 1px solid rgba(0, 75, 95, 0.4);
  border-radius: 6px;
  transition: border-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: #5c99af;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
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
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  color: #00465f;
  margin: 0 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ArrowDownIcon = styled(ArrowDown)`
  width: 12px;
`;

export const ArrowUpIcon = styled(ArrowUp)`
  width: 12px;
`;
