import axios from 'axios';

import {
  hardwareTypes,
  testInputs,
  ledCreateInputs,
  remoteCreateInputs,
  ledUpdateInputs
} from './hardware.types';

export const getInputsForCreate = type => {
  switch (type) {
    case hardwareTypes.led:
      return ledCreateInputs;
    case hardwareTypes.remote:
      return remoteCreateInputs;
    default:
      return ledCreateInputs;
  }
};

export const getInputsForUpdate = type => {
  switch (type) {
    case hardwareTypes.led:
      return ledUpdateInputs;
    default:
      return ledUpdateInputs;
  }
};

export const isInputValid = (name, value) =>
  testInputs[name].test(value.toString());

export const isFormValid = inputs =>
  Object.entries(inputs)
    .filter(([key, value]) => {
      if (!value.toString().trim().length) return true;
      return !isInputValid(key, value);
    })
    .map(value => value[0]);

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

export const updateHardware = (userId, moduleId, hardware, id, type, ip) =>
  axios({
    url: `/api/hardware/${type}`,
    method: 'put',
    data: {
      userId,
      moduleId,
      hardware,
      id,
      ip
    }
  });
