import React, { useState, useEffect } from 'react';

import {
  getTemplateForUpdate,
  isFormValid,
} from '../../hardware/hardware.utils';

import HardwareInput from '../hardware-input/hardware-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { HardwareFormContainer } from './hardware-form.styles';

const HardwareForm = ({ hardware, type, updateHardware, refresh }) => {
  const [inputs, setInputs] = useState(hardware);
  const [template, setTemplate] = useState({});

  useEffect(() => {
    if (refresh) setInputs(hardware);
    else {
      setTemplate(getTemplateForUpdate(type));
      setInputs(hardware);
    }
  }, [type, hardware, refresh]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid(inputs)) onUpdateHardware(inputs);
  };

  const onUpdateHardware = (hardware) => {
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
        Object.entries(template).map(
          ([key, { props, title, display }], index) =>
            display && (
              <HardwareInput
                key={key}
                {...props}
                withTitle={title}
                mode={inputs.mode || 0}
                name={key}
                value={inputs[key] === undefined ? index : inputs[key]}
                handleChange={handleInputChange}
              />
            )
        )}
      <CustomButton margin={'0.75em 0 0 0'} type='submit'>
        Nastaviť
      </CustomButton>
    </HardwareFormContainer>
  );
};

export default HardwareForm;
