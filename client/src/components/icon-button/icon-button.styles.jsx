import styled, { css } from 'styled-components';

const floatStyles = css`
  position: fixed;
  bottom: 4em;
  right: 4em;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 2px 5px #d0e8f0;
  z-index: 2;

  &:hover {
    box-shadow: 2px 4px 8px #d0e8f0;
  }
`;

const floatStyle = ({ float }) => float && floatStyles;

export const IconButtonContainer = styled.button`
  cursor: pointer;
  width: 40px;
  height: 40px;
  padding: 1em;
  border: none;
  outline: none;
  background-color: #00465f;

  & > * {
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-in-out;
  }

  &:hover > * {
    transform: scale(1.06);
  }

  ${floatStyle};
`;
