import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import _ from 'lodash';

import {
  hardwareTypes,
  hardwareSlovakTypes,
} from '../../hardware/hardware.types';
import {
  hardwareSlovakInputs,
  inputTypes,
} from '../../hardware/hardware.inputs';
import {
  getInputsForCreate,
  getTemplateForCreate,
  isInputValid,
  isFormValid,
} from '../../hardware/hardware.utils';

import CustomButton from '../custom-button/custom-button.component';

import {
  ModalHeader,
  ModalTitle,
  ModalForm,
  ModalSelectInput,
  ModalTextInput,
  CloseButton,
} from './hardware-modal.styles';

Modal.setAppElement('#root');

const HardwareModal = ({
  isModalOpen,
  setIsModalOpen,
  type,
  setType,
  onSubmit,
}) => {
  const [inputs, setInputs] = useState({});
  const [template, setTemplate] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setInputs(getInputsForCreate(type));
    setTemplate(getTemplateForCreate(type));
    setErrors([]);
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorArray = isFormValid(inputs);
    setErrors(errorArray);
    if (errorArray.length) return;

    onSubmit(inputs, type);
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setType(hardwareTypes[value]);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    if (isInputValid(name, value)) {
      setInputs({ ...inputs, [name]: value });
      setErrors(errors.filter((value) => value !== name));
    } else setErrors([...errors, name]);
  };

  return (
    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
      <ModalHeader>
        <ModalTitle>OVLÁDAJ</ModalTitle>
        <CloseButton onClick={() => setIsModalOpen(false)} />
      </ModalHeader>
      <ModalForm onSubmit={handleSubmit}>
        <ModalSelectInput onChange={handleSelectChange} value={type}>
          {Object.entries(hardwareTypes).map(([key, value]) => (
            <option key={key} value={value}>
              {_.capitalize(hardwareSlovakTypes[value])}
            </option>
          ))}
        </ModalSelectInput>
        {Object.keys(template).length &&
          Object.entries(template).map(([key, { props }]) =>
            props.type === inputTypes.text ? (
              <ModalTextInput
                type={props.type}
                key={key}
                value={inputs[key]}
                name={key}
                placeholder={_.capitalize(hardwareSlovakInputs[key])}
                error={errors.includes(key)}
                onChange={handleInputChange}
              />
            ) : (
              <ModalSelectInput
                name={key}
                key={key}
                onChange={handleInputChange}
                value={inputs[key]}
              >
                {props.options.map((value, i) => (
                  <option key={i} value={i.toString()}>
                    {_.capitalize(value)}
                  </option>
                ))}
              </ModalSelectInput>
            )
          )}
        <CustomButton type='submit'>Pridaj</CustomButton>
      </ModalForm>
    </Modal>
  );
};

export default HardwareModal;
