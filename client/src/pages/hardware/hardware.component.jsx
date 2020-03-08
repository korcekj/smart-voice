import React, { useState, useEffect } from 'react';

import { moduleActionTypes } from '../../redux/module/module.types';
import { hardwareSlovakTypes } from '../../hardware/hardware.types';

import Spinner from '../../components/spinner/spinner.component';
import RecognitionInput from '../../components/recognition-input/recognition-input.component';
import HardwareForm from '../../components/hardware-form/hardware-form.component';

import {
  HardwareOverlay,
  HardwareContainer,
  HardwareUndefinedContainer,
  HardwareUndefinedText,
  HardwareUndefinedTextId,
  HardwareHeaderContainer,
  HardwareTitle,
  HardwareSubtitle,
  BackIcon,
  DeleteIcon
} from './hardware.styles';

const HardwarePage = ({
  hardware,
  removeHardware,
  updateHardware,
  isFetching,
  setMessage,
  clearError,
  error,
  match,
  history
}) => {
  const [isError, setIsError] = useState(false);
  const { moduleId, hardwareType, hardwareId } = match.params;

  useEffect(() => {
    if (error.type === moduleActionTypes.UPDATE_HARDWARE_FAILURE) {
      setIsError(true);
      setMessage({
        message: 'Hardware sa nepodarilo aktualizovať',
        type: 'error'
      });
      clearError();
    }
  }, [error, setMessage, clearError]);

  const onRemoveHardware = () => {
    setIsError(false);
    removeHardware(hardwareId, hardwareType, moduleId);
    history.goBack();
  };

  const onUpdateHardware = data => {
    setIsError(false);
    updateHardware(hardwareId, data, hardwareType, moduleId);
  };

  return (
    <HardwareOverlay>
      {hardware ? (
        <HardwareContainer>
          {isFetching && <Spinner float={true} />}
          <HardwareHeaderContainer>
            <div>
              <BackIcon onClick={() => history.goBack()} />
              <HardwareTitle>
                {hardware.name}
                <HardwareSubtitle>
                  {`(:${hardwareSlovakTypes[hardwareType]})`}
                </HardwareSubtitle>
              </HardwareTitle>
            </div>
            <DeleteIcon onClick={onRemoveHardware} />
          </HardwareHeaderContainer>
          <RecognitionInput />
          <HardwareForm
            type={hardwareType}
            hardware={hardware}
            updateHardware={onUpdateHardware}
            isError={isError}
          />
        </HardwareContainer>
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
