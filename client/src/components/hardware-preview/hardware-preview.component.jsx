import React, { useState, useEffect } from 'react';

import { moduleActionTypes } from '../../redux/module/module.types';
import { hardwareTypes } from '../../hardware/hardware.types';

import HardwareModal from '../hardware-modal/hardware-modal.component';
import HardwareItem from '../hardware-item/hardware-item.component';
import IconButton from '../icon-button/icon-button.component';
import { ReactComponent as PlusIcon } from '../../assets/icons/add.svg';

import {
  HardwarePreviewOverlay,
  HardwarePreviewContainer,
  HardwareContainer,
  HardwareOverlay,
} from './hardware-preview.styles';

const HardwarePreview = ({
  hardware,
  error,
  addHardware,
  removeHardware,
  setMessage,
  clearError,
  match,
}) => {
  const [modalStatus, setModalStatus] = useState({
    type: hardwareTypes.led,
    open: false,
  });

  const { moduleId } = match.params;

  useEffect(() => {
    if (error.type === moduleActionTypes.ADD_HARDWARE_FAILURE) {
      setMessage({
        message: 'Hardware sa nepodarilo pridať',
        type: 'error',
      });
      clearError();
    } else if (error.type === moduleActionTypes.REMOVE_HARDWARE_FAILURE) {
      setMessage({
        message: 'Hardware sa nepodarilo vymazať',
        type: 'error',
      });
      clearError();
    }
  }, [error, setMessage, clearError]);

  const onAddHardwareStart = (type) => {
    setModalStatus({ type, open: true });
  };

  const setIsModalOpen = (open) => {
    setModalStatus({ ...modalStatus, open });
  };

  const setModalType = (type) => {
    setModalStatus({ ...modalStatus, type });
  };

  const onAddHardware = (hardware, type) => {
    setIsModalOpen(false);
    addHardware(hardware, type, moduleId);
  };

  const onRemoveHardware = (id, type) => {
    removeHardware(id, type, moduleId);
  };

  return (
    <HardwarePreviewOverlay>
      <HardwarePreviewContainer>
        <HardwareOverlay>
          <HardwareContainer>
            {Object.keys(hardwareTypes).map((key) => {
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
            <IconButton float light onClick={() => setIsModalOpen(true)}>
              <PlusIcon />
            </IconButton>
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
