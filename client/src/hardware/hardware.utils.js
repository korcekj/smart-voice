// Importovanie potrebnych packages
import axios from 'axios';
import _ from 'lodash';

// Importovanie vstupov a konfiguracii hardverovych sucasti
import { hardwareTypes } from './hardware.types';
import { testInputs } from './hardware.inputs';
import { ledCreateInputs, ledUpdateInputs } from './led/led.types';
import { remoteCreateInputs, remoteUpdateInputs } from './remote/remote.types';

// Funkcia na ziskanie vstupov pre formular na vytvorenie hardverovej sucasti
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

// Funkcia na ziskanie predlohy vstupov pre formular na vytvorenie hardverovej sucasti
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

// Funkcia na ziskanie predlohy vstupov pre formular na aktualizaciu hardverovej sucasti
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

// Funkcia sluziaca na validaciu pouzivatelskeho vstupu
export const isInputValid = (name, value) =>
  testInputs[name] ? testInputs[name].test(value.toString()) : true;

// Funckia na validaciu formularu vyplneneho pouzivatelom
export const isFormValid = (inputs) =>
  Object.entries(inputs)
    .filter(([key, value]) => {
      if (typeof value === 'object') return false;
      else if (value.toString().trim().length === 0) return true;
      return !isInputValid(key, value);
    })
    .map((value) => value[0]);

// Funkcia na validaciu operacii pri zvolenych modoch ako napriklad LED
export const validateOperations = (type, mode, data) => {
  const template = getTemplateForUpdate(type);
  return _.pickBy(data, (value, key) => {
    if (template[key] && !template[key].props.disabled.includes(Number(mode)))
      return true;
    return false;
  });
};

// Funkcia na vytvorenie objektu s ciselnou hodnotou
export const setNumber = (args = [], propName, off = 0) => {
  const number = args[0] + off;
  if (!isInputValid(propName, number)) return null;
  return {
    [propName]: number,
  };
};

// Funkcia na vytvorenie objektu s hodnotou RGB
export const setColor = (args = [], propName, off = 0) => {
  const colorIndex = args[0] + off;
  if (!isInputValid(propName, colorIndex)) return null;
  return {
    colors: {
      [`${propName}${colorIndex}`]: args[1],
    },
  };
};

// Funkcia na pridanie hardverovej sucasti k danemu ESP8266 modulu
export const addHardware = (userId, moduleId, hardware, type, ip) =>
  // Vytvorenie HTTP poziadavky na nas back-end
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

// Funkcia na odstraenie hardverovej sucasti z danemu ESP8266 modulu
export const removeHardware = (userId, moduleId, id, type, ip) =>
  // Vytvorenie HTTP poziadavky na nas back-end
  axios({
    url: `/api/hardware/${type}/${moduleId}`,
    method: 'delete',
    data: {
      userId,
      id,
      ip,
    },
  });

// Funkcia na aktualizaciu hardverovej sucasti patriaca danemu ESP8266 modulu
export const updateHardware = (userId, moduleId, hardware, id, type, ip) =>
  // Vytvorenie HTTP poziadavky na nas back-end
  axios({
    url: `/api/hardware/${type}/${moduleId}`,
    method: 'put',
    data: {
      userId,
      hardware,
      id,
      ip,
    },
  });
