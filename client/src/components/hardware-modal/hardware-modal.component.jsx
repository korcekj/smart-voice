import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import {
  hardwareTypes,
  hardwareSlovakTypes,
  hardwareSlovakInputs,
  capitalize
} from '../../hardware/hardware.types';
import {
  getInputs,
  isInputValid,
  isFormValid
} from '../../hardware/hardware.utils';

import CustomButton from '../custom-button/custom-button.component';

import {
  ModalHeader,
  ModalTitle,
  ModalForm,
  ModalSelect,
  ModalInput,
  CloseButton
} from './hardware-modal.styles';

Modal.setAppElement('#root');

const HardwareModal = ({
  isModalOpen,
  setIsModalOpen,
  type,
  setType,
  onSubmit
}) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setInputs(getInputs(type));
    setErrors([]);
  }, [type]);

  const handleSubmit = e => {
    e.preventDefault();

    const errorArray = isFormValid(inputs);
    setErrors(errorArray);
    if (errorArray.length) return;

    onSubmit(inputs, type);
  };

  const handleSelectChange = e => {
    const { value } = e.target;
    setType(hardwareTypes[value]);
  };

  const handleInputChange = e => {
    const { value, name } = e.target;

    if (isInputValid(name, value)) {
      setInputs({ ...inputs, [name]: value });
      setErrors(errors.filter(value => value !== name));
    } else setErrors([...errors, name]);
  };

  return (
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
      <ModalHeader>
        <ModalTitle>OVLÁDAJ</ModalTitle>
        <CloseButton onClick={() => setIsModalOpen(false)} />
      </ModalHeader>
      <ModalForm onSubmit={handleSubmit}>
        <ModalSelect onChange={handleSelectChange} value={type}>
          {Object.entries(hardwareTypes).map(([key, value]) => (
            <option key={key} value={value}>
              {capitalize(hardwareSlovakTypes[value])}
            </option>
          ))}
        </ModalSelect>
        {Object.entries(inputs).map(([key, value]) => (
          <ModalInput
            type='text'
            key={key}
            value={value}
            name={key}
            placeholder={capitalize(hardwareSlovakInputs[key])}
            error={errors.includes(key)}
            onChange={handleInputChange}
          />
        ))}
        <CustomButton type='submit'>Pridaj</CustomButton>
      </ModalForm>
    </Modal>
  );
};

export default HardwareModal;
