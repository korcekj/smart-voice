export const hardwareTypes = {
  led: 'led',
  remote: 'remote'
};

export const hardwareSlovakTypes = {
  led: 'žiarovka',
  remote: 'diaľkový ovládač'
};

export const hardwareSlovakInputs = {
  name: 'názov',
  numLeds: 'počet led',
  frequency: 'frekvencia',
  pin: 'pin'
};

export const testInputs = {
  name: /^([\w\W\d]{0,16})?$/m,
  numLeds: /^([1-9](\d){0,2})?$/m,
  frequency: /^([1-9](\d){0,4})?$/m,
  pin: /^([1-9](\d){0,1})?$/m
};

export const ledInputs = {
  name: '',
  numLeds: '',
  pin: ''
};

export const remoteInputs = {
  name: '',
  frequency: '',
  pin: ''
};

export const capitalize = value =>
  value.charAt(0).toUpperCase() + value.slice(1);
