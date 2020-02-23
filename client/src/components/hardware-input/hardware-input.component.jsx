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
  InputRadioLabel,
  InputRadio,
  RadioCheckmark
} from './hardware-input.styles';

const HardwareInput = ({
  type,
  withTitle,
  disabled,
  mode,
  handleChange,
  ...props
}) => {
  const { name, value } = props;

  const renderColorButtons = () => {
    let elements = [];

    if (!value) return elements;

    const number = props.numbers ? props.numbers[mode] || 0 : 0;

    for (let i = 0; i < number; i++) {
      if (Object.entries(value)[i]) {
        const [id, color] = Object.entries(value)[i];
        elements.push(
          <ColorButton
            key={id}
            color={color}
            onChange={rgb =>
              handleChange({
                target: { name, value: { ...value, [id]: rgb } }
              })
            }
          />
        );
      } else {
        const id = `color${i}`;
        elements.push(
          <ColorButton
            key={id}
            onChange={rgb =>
              handleChange({
                target: { name, value: { ...value, [id]: rgb } }
              })
            }
          />
        );
      }
    }

    return elements;
  };

  const renderRadioButtons = () => {
    let elements = [];

    for (let i = 0; i < props.number; i++) {
      elements.push(
        <Container key={i}>
          <InputRadioContainer>
            <InputRadio
              {...props}
              value={i}
              checked={Number(value) === i}
              onChange={handleChange}
            />
            <RadioCheckmark />
          </InputRadioContainer>
          <InputRadioLabel bold={Number(value) === i}>{`${i +
            1}.`}</InputRadioLabel>
        </Container>
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
    <InputContainer
      border={withTitle}
      disabled={disabled.includes(Number(mode))}
    >
      {withTitle && <InputTitle>{hardwareSlovakInputs[name]}</InputTitle>}
      {renderInput()}
    </InputContainer>
  );
};

export default React.memo(HardwareInput);
