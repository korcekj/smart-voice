import React, { useState, useEffect } from 'react';

import { moduleActionTypes } from '../../redux/module/module.types';

import Spinner from '../../components/spinner/spinner.component';
import RecognitionInput from '../../components/recognition-input/recognition-input.component';
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

const HardwarePage = ({
  hardware,
  removeHardware,
  updateHardware,
  isFetching,
  error,
  match,
  history
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { moduleId, hardwareType, hardwareId } = match.params;

  useEffect(() => {
    if (error.type === moduleActionTypes.UPDATE_HARDWARE_FAILURE) {
      setErrorMessage('Hardware sa nepodarilo aktualizovať');
    }
  }, [error]);

  const onRemoveHardware = () => {
    setErrorMessage(null);
    removeHardware(hardwareId, hardwareType, moduleId);
    history.goBack();
  };

  const onUpdateHardware = data => {
    setErrorMessage(null);
    updateHardware(hardwareId, data, hardwareType, moduleId);
  };

  return (
    <HardwareOverlay>
      {hardware ? (
        <div>
          {isFetching && <Spinner float={true} />}
          <HardwareHeaderContainer>
            <div>
              <BackIcon onClick={() => history.goBack()} />
              <HardwareTitle>{hardware.name}</HardwareTitle>
            </div>{' '}
            <DeleteIcon onClick={onRemoveHardware} />
          </HardwareHeaderContainer>
          <RecognitionInput />
          <HardwareForm
            type={hardwareType}
            hardware={hardware}
            updateHardware={onUpdateHardware}
            isError={!!errorMessage}
          />
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
