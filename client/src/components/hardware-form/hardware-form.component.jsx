import React, { useState, useEffect } from 'react';

import { getInputsForUpdate } from '../../hardware/hardware.utils';

import HardwareInput from '../hardware-input/hardware-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { HardwareFormContainer } from './hardware-form.styles';

const HardwareForm = ({ type, hardware }) => {
  const [inputs, setInputs] = useState(hardware);
  const [template, setTemplate] = useState({});

  useEffect(() => {
    setTemplate(getInputsForUpdate(type));
  }, [type]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(inputs);
  };

  const handleInputChange = (e, submit = false) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <HardwareFormContainer onSubmit={handleSubmit}>
      {Object.keys(template).length &&
        Object.entries(template).map(([key, { props, title }]) => (
          <HardwareInput
            key={key}
            {...props}
            withTitle={title}
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
