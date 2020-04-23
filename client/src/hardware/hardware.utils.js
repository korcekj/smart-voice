import axios from 'axios';
import _ from 'lodash';

import {
  hardwareTypes,
  testInputs,
  ledCreateInputs,
  remoteCreateInputs,
  ledUpdateInputs,
  remoteUpdateInputs,
} from './hardware.types';

export const getInputsForCreate = (type) => {
  switch (type) {
    case hardwareTypes.led:
      return Object.entries(ledCreateInputs).reduce(
        (reducer, [key, { props }]) => {
          reducer[key] = props.value;
          return reducer;
        },
        {}
      );
    case hardwareTypes.remote:
      return Object.entries(remoteCreateInputs).reduce(
        (reducer, [key, { props }]) => {
          reducer[key] = props.value;
          return reducer;
        },
        {}
      );
    default:
      return {};
  }
};

export const getTemplateForCreate = (type) => {
  switch (type) {
    case hardwareTypes.led:
      return ledCreateInputs;
    case hardwareTypes.remote:
      return remoteCreateInputs;
    default:
      return {};
  }
};

export const getTemplateForUpdate = (type) => {
  switch (type) {
    case hardwareTypes.led:
      return ledUpdateInputs;
    case hardwareTypes.remote:
      return remoteUpdateInputs;
    default:
      return {};
  }
};

export const isInputValid = (name, value) =>
  testInputs[name] ? testInputs[name].test(value.toString()) : true;

export const isFormValid = (inputs) =>
  Object.entries(inputs)
    .filter(([key, value]) => {
      if (typeof value === 'object') return false;
      else if (value.toString().trim().length === 0) return true;
      return !isInputValid(key, value);
    })
    .map((value) => value[0]);

export const validateOperations = (type, mode, data) => {
  const template = getTemplateForUpdate(type);
  return _.pickBy(data, (value, key) => {
    if (template[key] && !template[key].props.disabled.includes(Number(mode)))
      return true;
    return false;
  });
};

export const addHardware = (userId, moduleId, hardware, type, ip) =>
  axios({
    url: `/api/hardware/${type}`,
    method: 'post',
    data: {
      userId,
      moduleId,
      hardware,
      ip,
    },
  });

export const removeHardware = (userId, moduleId, id, type, ip) =>
  axios({
    url: `/api/hardware/${type}`,
    method: 'delete',
    data: {
      userId,
      moduleId,
      id,
      ip,
    },
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
      ip,
    },
  });
