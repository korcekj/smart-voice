import axios from 'axios';

import {
  hardwareTypes,
  testInputs,
  ledInputs,
  remoteInputs
} from './hardware.types';

export const getInputs = type => {
  switch (type) {
    case hardwareTypes.led:
      return ledInputs;
    case hardwareTypes.remote:
      return remoteInputs;
    default:
      return ledInputs;
  }
};

export const isInputValid = (name, value) => testInputs[name].test(value);

export const isFormValid = inputs =>
  Object.entries(inputs)
    .filter(([key, value]) => {
      if (!value.trim().length) return true;
      return !isInputValid(key, value);
    })
    .map(value => (value ? value[0] : null));

export const addHardware = (userId, moduleId, hardware, type, ip) =>
  axios({
    url: `/api/hardware/${type}`,
    method: 'post',
    data: {
      userId,
      moduleId,
      hardware,
      ip
    }
  });

export const removeHardware = (userId, moduleId, id, type, ip) =>
  axios({
    url: `/api/hardware/${type}`,
    method: 'delete',
    data: {
      userId,
      moduleId,
      id,
      ip
    }
  });
