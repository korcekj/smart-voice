import React, { useEffect } from 'react';

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
  const { moduleId, hardwareType, hardwareId } = match.params;
  const refresh = !!Object.keys(error).length;

  useEffect(() => {
    if (error.type === moduleActionTypes.UPDATE_HARDWARE_FAILURE) {
      setMessage({
        message: 'Hardware sa nepodarilo aktualizovať',
        type: 'error'
      });
      clearError();
    }
  }, [error, setMessage, clearError]);

  const onRemoveHardware = () => {
    removeHardware(hardwareId, hardwareType, moduleId);
    history.goBack();
  };

  const onUpdateHardware = data => {
    updateHardware(
      hardwareId,
      { ...hardware, ...data },
      hardwareType,
      moduleId
    );
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
          <RecognitionInput updateHardware={onUpdateHardware} />
          <HardwareForm
            type={hardwareType}
            hardware={hardware}
            updateHardware={onUpdateHardware}
            refresh={refresh}
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
