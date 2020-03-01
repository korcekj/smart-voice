import React, { useState, useEffect } from 'react';

import { getInputsForUpdate, isFormValid } from '../../hardware/hardware.utils';

import HardwareInput from '../hardware-input/hardware-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { HardwareFormContainer } from './hardware-form.styles';

const HardwareForm = ({ hardware, type, updateHardware, isError }) => {
  const [inputs, setInputs] = useState(hardware);
  const [template, setTemplate] = useState({});

  useEffect(() => {
    if (isError) setInputs(hardware);
    setTemplate(getInputsForUpdate(type));
  }, [type, hardware, isError]);

  const handleSubmit = e => {
    e.preventDefault();

    if (isFormValid(inputs)) onUpdateHardware(inputs);
  };

  const onUpdateHardware = hardware => {
    updateHardware(hardware);
  };

  const handleInputChange = (e, submit = false) => {
    const { value, name } = e.target;
    const newInputs = { ...inputs, [name]: value };

    setInputs(newInputs);

    if (submit) onUpdateHardware(newInputs);
  };

  return (
    <HardwareFormContainer onSubmit={handleSubmit}>
      {Object.keys(template).length &&
        Object.entries(template).map(([key, { props, title }]) => (
          <HardwareInput
            key={key}
            {...props}
            withTitle={title}
            mode={inputs.mode || 0}
            name={key}
            value={inputs[key]}
            handleChange={handleInputChange}
          />
        ))}
      <CustomButton type='submit'>Nastaviť</CustomButton>
    </HardwareFormContainer>
  );
};

export default HardwareForm;
