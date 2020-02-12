import React, { useState, useEffect } from 'react';

import { moduleActionTypes } from '../../redux/module/module.types';
import { hardwareTypes } from '../../hardware/hardware.types';

import HardwareModal from '../hardware-modal/hardware-modal.component';
import HardwareItem from '../hardware-item/hardware-item.component';

import {
  HardwarePreviewOverlay,
  HardwarePreviewContainer,
  HardwarePreviewHeader,
  HardwareContainer,
  HardwareOverlay,
  ErrorMessage,
  LoadingSpinner
} from './hardware-preview.styles';

const HardwarePreview = ({
  hardware,
  error,
  addHardware,
  removeHardware,
  isFetching,
  match
}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalStatus, setModalStatus] = useState({
    type: hardwareTypes.led,
    open: false
  });

  const { moduleId } = match.params;

  useEffect(() => {
    if (error.type === moduleActionTypes.ADD_HARDWARE_FAILURE) {
      setErrorMessage('Hardware sa nepodarilo pridať');
    }
  }, [error]);

  const onAddHardwareStart = type => {
    setModalStatus({ type, open: true });
  };

  const setIsModalOpen = open => {
    setModalStatus({ ...modalStatus, open });
  };

  const setModalType = type => {
    setModalStatus({ ...modalStatus, type });
  };

  const onAddHardware = (hardware, type) => {
    setErrorMessage(null);
    setIsModalOpen(false);
    addHardware(hardware, type, moduleId);
  };

  const onRemoveHardware = (id, type) => {
    setErrorMessage(null);
    removeHardware(id, type, moduleId);
  };

  return (
    <HardwarePreviewOverlay>
      <HardwarePreviewHeader>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {isFetching && <LoadingSpinner />}
      </HardwarePreviewHeader>
      <HardwarePreviewContainer>
        <HardwareOverlay>
          <HardwareContainer>
            {Object.keys(hardwareTypes).map(key => {
              if (hardware && Object.keys(hardware[key] || {}).length) {
                return Object.entries(hardware[key]).map(([id, { name }]) => (
                  <HardwareItem
                    key={id}
                    id={id}
                    name={name}
                    type={key}
                    removeHardware={onRemoveHardware}
                  />
                ));
              }
              return (
                <HardwareItem
                  key={key}
                  type={key}
                  moduleId={moduleId}
                  addHardware={onAddHardwareStart}
                />
              );
            })}
          </HardwareContainer>
        </HardwareOverlay>
      </HardwarePreviewContainer>
      {modalStatus.open && (
        <HardwareModal
          isModalOpen={modalStatus.open}
          setIsModalOpen={setIsModalOpen}
          type={modalStatus.type}
          setType={setModalType}
          onSubmit={onAddHardware}
        />
      )}
    </HardwarePreviewOverlay>
  );
};

export default HardwarePreview;
