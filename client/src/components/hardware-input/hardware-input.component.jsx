import React from 'react';

import ColorButton from '../color-button/color-button.component';
import IconButton from '../icon-button/icon-button.component';

import { ReactComponent as PowerIcon } from '../../assets/icons/power.svg';
import { ReactComponent as VolumeUpIcon } from '../../assets/icons/volume-up.svg';
import { ReactComponent as VolumeDownIcon } from '../../assets/icons/volume-down.svg';
import { ReactComponent as ChannelUpIcon } from '../../assets/icons/channel-up.svg';
import { ReactComponent as ChannelDownIcon } from '../../assets/icons/channel-down.svg';

import {
  inputTypes,
  hardwareSlovakInputs,
} from '../../hardware/hardware.inputs';

import {
  Container,
  InputContainer,
  InputTitle,
  InputDesc,
  InputRange,
  InputRangeLabel,
  InputSwitchContainer,
  InputSwitchLabel,
  InputSwitch,
  SwitchSlider,
  InputRadioContainer,
  InputRadioLabel,
  InputRadio,
  RadioCheckmark,
} from './hardware-input.styles';

const buttonIcons = {
  power: <PowerIcon />,
  volumeUp: <VolumeUpIcon />,
  volumeDown: <VolumeDownIcon />,
  channelUp: <ChannelUpIcon />,
  channelDown: <ChannelDownIcon />,
};

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

    const number = props.numbers ? props.numbers[mode] || 0 : 0;

    for (let i = 0; i < number; i++) {
      if (value && Object.entries(value)[i]) {
        const [id, color] = Object.entries(value)[i];
        elements.push(
          <ColorButton
            key={id}
            color={color}
            onChange={(rgb) =>
              handleChange({
                target: { name, value: { ...value, [id]: rgb } },
              })
            }
          />
        );
      } else {
        const id = `color${i}`;
        elements.push(
          <ColorButton
            key={id}
            onChange={(rgb) =>
              handleChange({
                target: { name, value: { ...value, [id]: rgb } },
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
        <Container flex justify='center' key={i}>
          <InputRadioContainer>
            <InputRadio
              {...props}
              value={i}
              checked={Number(value) === i}
              onChange={handleChange}
            />
            <RadioCheckmark />
          </InputRadioContainer>
          <InputRadioLabel bold={Number(value) === i}>{`${
            i + 1
          }.`}</InputRadioLabel>
        </Container>
      );
    }

    return elements;
  };

  const renderInput = () => {
    switch (type) {
      case inputTypes.range:
        return (
          <Container space>
            <React.Fragment>
              <InputRange {...props} onChange={handleChange} />
              <InputRangeLabel>{value}</InputRangeLabel>
            </React.Fragment>
          </Container>
        );
      case inputTypes.checkbox:
        return (
          <Container flex space>
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
        return (
          <Container flex justify='space-between' space>
            {renderRadioButtons()}
          </Container>
        );
      case inputTypes.color:
        return (
          <Container flex justify='space-evenly' space>
            {renderColorButtons()}
          </Container>
        );
      case inputTypes.button:
        return (
          <Container flex justify='space-between' space border>
            <IconButton
              type={type}
              onClick={() =>
                handleChange(
                  { target: { name: props.altName || name, value } },
                  true
                )
              }
              light
              rounded
              big
            >
              {buttonIcons[props.icon]}
            </IconButton>
            {props.desc && <InputDesc>{props.desc}</InputDesc>}
          </Container>
        );
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
