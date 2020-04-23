import styled, { css } from 'styled-components';

const lightStyles = css`
  background-color: #d0e8f0;
  color: #00465f;
`;

const darkStyles = css`
  background-color: #00465f;
  color: white;
`;

const roundedStyles = css`
  border-radius: 50%;
`;

const bigStyles = css`
  width: 5em;
  height: 5em;
`;

const mediumStyles = css`
  width: 2.5em;
  height: 2.5em;
`;

const floatStyles = css`
  position: fixed;
  bottom: 4em;
  right: 4em;
  ${bigStyles};
  box-shadow: 1px 2px 5px #d0e8f0;
  ${roundedStyles};
  z-index: 20;

  &:hover {
    box-shadow: 2px 4px 8px #d0e8f0;
  }
`;

const floatStyle = ({ float }) => float && floatStyles;

const roundedStyle = ({ rounded }) => rounded && roundedStyles;

const background = ({ light }) => (light ? lightStyles : darkStyles);

const sizeStyles = ({ big }) => (big ? bigStyles : mediumStyles);

export const IconButtonContainer = styled.button`
  cursor: pointer;
  padding: 1em;
  border: none;
  outline: none;

  & > * {
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-in-out;
  }

  &:hover > * {
    transform: scale(1.06);
  }

  ${sizeStyles};
  ${floatStyle};
  ${roundedStyle};
  ${background};
`;
