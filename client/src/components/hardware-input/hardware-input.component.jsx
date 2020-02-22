import React from 'react';

import ColorButton from '../color-button/color-button.component';

import {
  inputTypes,
  hardwareSlovakInputs
} from '../../hardware/hardware.types';

import {
  Container,
  InputContainer,
  InputTitle,
  InputRange,
  InputRangeLabel,
  InputSwitchContainer,
  InputSwitchLabel,
  InputSwitch,
  SwitchSlider,
  InputRadioContainer,
  InputRadio,
  RadioCheckmark
} from './hardware-input.styles';

const HardwareInput = ({ type, withTitle, handleChange, ...props }) => {
  const { name, value } = props;

  const renderColorButtons = () =>
    Object.entries(value).map(([id, color]) => (
      <ColorButton
        key={id}
        color={color}
        onChange={rgb =>
          handleChange({ target: { name, value: { ...value, [id]: rgb } } })
        }
      />
    ));

  const renderRadioButtons = () => {
    let elements = [];

    for (let i = 0; i < props.number; i++) {
      elements.push(
        <InputRadioContainer key={i}>
          <InputRadio
            {...props}
            value={i}
            checked={Number(value) === i}
            onChange={handleChange}
          />
          <RadioCheckmark />
        </InputRadioContainer>
      );
    }

    return elements;
  };

  const renderInput = () => {
    switch (type) {
      case inputTypes.range:
        return (
          <React.Fragment>
            <InputRange {...props} onChange={handleChange} />
            <InputRangeLabel>{value}</InputRangeLabel>
          </React.Fragment>
        );
      case inputTypes.checkbox:
        return (
          <Container>
            <InputSwitchLabel bold={!value}>OFF</InputSwitchLabel>
            <InputSwitchContainer>
              <InputSwitch
                {...props}
                checked={!!value}
                onChange={() =>
                  handleChange({ target: { name, value: value ? 0 : 1 } }, true)
                }
              />
              <SwitchSlider />
            </InputSwitchContainer>
            <InputSwitchLabel bold={value}>ON</InputSwitchLabel>
          </Container>
        );
      case inputTypes.radio:
        return <Container space='between'>{renderRadioButtons()}</Container>;
      case inputTypes.color:
        return <Container space='evenly'>{renderColorButtons()}</Container>;
      default:
        return;
    }
  };

  return (
    <InputContainer border={withTitle}>
      {withTitle && <InputTitle>{hardwareSlovakInputs[name]}</InputTitle>}
      {renderInput()}
    </InputContainer>
  );
};

export default React.memo(HardwareInput);
