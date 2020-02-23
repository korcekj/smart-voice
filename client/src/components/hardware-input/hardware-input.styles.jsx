import styled, { css } from 'styled-components';

const disabledStyles = css`
  opacity: 0.4;
  pointer-events: none;
`;

export const InputContainer = styled.div`
  width: 100%;
  padding: 1em;
  margin-bottom: 1.5em;
  ${({ border }) => border && 'border: 2px solid rgba(0, 75, 95, 0.4)'};
  border-radius: 6px;
  ${({ disabled }) => disabled && disabledStyles};
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ space }) => space && `space-${space}`};
`;

export const InputTitle = styled.h3`
  color: #00465f;
  text-transform: capitalize;
  margin: 0;
  margin-bottom: 0.5em;
  text-align: center;
`;

export const InputRangeLabel = styled.div`
  position: relative;
  display: inline-block;
  min-width: 50px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 0.8em 1em;
  margin: 1em 0 0 10px;
  color: white;
  background-color: #00465f;
  border-radius: 3px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -5px;
    width: 10px;
    height: 10px;
    background-color: #00465f;
    transform: translateY(-50%) rotate(45deg);
  }
`;

export const InputRange = styled.input.attrs({ type: 'range' })`
  font-size: 12px;
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #d0e8f0;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
  border-radius: 6px;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #1e6984;
    border: 2px solid white;
    border-radius: 50%;
    cursor: pointer;
  }

  &::-moz-range-thumb {
  }
`;

export const InputSwitchContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 28px;
  margin: 0 1em;
`;

export const SwitchSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d0e8f0;
  border-radius: 28px;
  transition: 0.4s;
  pointer-events: none;

  &::before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const InputSwitch = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 100%;
  height: 100%;
  border-radius: 28px;
  cursor: pointer;

  &:checked + ${SwitchSlider} {
    background-color: #00465f;
  }

  &:checked + ${SwitchSlider}::before {
    transform: translateX(20px);
  }
`;

export const InputSwitchLabel = styled.span`
  font-size: 14px;
  color: #00465f;
  ${({ bold }) => bold && 'font-weight: bold'};
`;

export const InputRadioContainer = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
`;

export const InputRadioLabel = styled.span`
  font-size: 14px;
  color: #00465f;
  margin-left: 1em;
  ${({ bold }) => bold && 'font-weight: bold'};
`;

export const RadioCheckmark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #d0e8f0;
  border-radius: 3px;
  pointer-events: none;
  transition: all 0.2s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 1px;
    background-color: white;
    transform: translate(-50%, -50%);
  }
`;

export const InputRadio = styled.input.attrs({ type: 'radio' })`
  opacity: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;

  &:hover ~ ${RadioCheckmark} {
    background-color: #d0e8f0;
  }

  &:checked ~ ${RadioCheckmark} {
    background-color: #00465f;
  }

  &:checked ~ ${RadioCheckmark}::after {
    display: block;
  }
`;
