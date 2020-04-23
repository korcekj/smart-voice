import styled, { css } from 'styled-components';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';

const inputStyle = css`
  font-size: 14px;
  font-weight: bold;
  padding: 0 1em;
  border: 1px solid #b1d2de;
  border-radius: 3px;
  background-color: transparent;
  color: #00465f;
  outline: none;
  height: 2.5em;
  min-width: 250px;
  transition: border-color 0.2s ease-in-out;
  border-color: ${({ error }) => (error ? '#DF5B5B' : '#b1d2de')};

  &:hover,
  &:focus {
    border-color: ${({ error }) => (error ? '#B53636' : '#5c99af')};
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;

export const ModalTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #00465f;
`;

export const CloseButton = styled(PlusIcon)`
  width: 25px;
  cursor: pointer;
  transform: rotate(45deg);
`;

export const ModalForm = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;

  & * {
    margin-bottom: 1em;
  }

  & *:last-child {
    margin-bottom: 0;
  }
`;

export const ModalSelectInput = styled.select`
  ${inputStyle}
`;

export const ModalTextInput = styled.input`
  ${inputStyle}
`;
