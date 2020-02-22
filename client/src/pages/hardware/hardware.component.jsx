import React from 'react';

import HardwareForm from '../../components/hardware-form/hardware-form.component';

import {
  HardwareOverlay,
  HardwareUndefinedContainer,
  HardwareUndefinedText,
  HardwareUndefinedTextId,
  HardwareHeaderContainer,
  HardwareTitle,
  BackIcon,
  DeleteIcon
} from './hardware.styles';

const HardwarePage = ({ hardware, removeHardware, match, history }) => {
  const { moduleId, hardwareType, hardwareId } = match.params;

  const onRemoveHardware = () => {
    removeHardware(hardwareId, hardwareType, moduleId);
    history.goBack();
  };

  return (
    <HardwareOverlay>
      {hardware ? (
        <div>
          <HardwareHeaderContainer>
            <div>
              <BackIcon onClick={() => history.goBack()} />
              <HardwareTitle>{hardware.name}</HardwareTitle>
            </div>
            <DeleteIcon onClick={onRemoveHardware} />
          </HardwareHeaderContainer>
          <HardwareForm type={hardwareType} hardware={hardware} />
        </div>
      ) : (
        <HardwareUndefinedContainer>
          <HardwareUndefinedText>
            Hardware{' '}
            <HardwareUndefinedTextId>{`${hardwareType.toUpperCase()} "${hardwareId}"`}</HardwareUndefinedTextId>{' '}
            sa nepodarilo nájsť
          </HardwareUndefinedText>
        </HardwareUndefinedContainer>
      )}
    </HardwareOverlay>
  );
};

export default HardwarePage;
