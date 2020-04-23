export const hardwareSlovakInputs = {
  name: 'názov',
  numLeds: 'počet led',
  frequency: 'frekvencia',
  pin: 'pin',
  brightness: 'jas',
  wait: 'pauza',
  status: 'stav',
  mode: 'mód',
  colors: 'farby',
  type: 'typ',
};

export const inputTypes = {
  text: 'text',
  range: 'range',
  checkbox: 'checkbox',
  radio: 'radio',
  color: 'color',
  select: 'select',
  button: 'button',
};

export const testInputs = {
  name: /^([\w\W\d]{0,16})?$/m,
  numLeds: /^([1-9](\d){0,2})?$/m,
  frequency: /^([1-9](\d){0,1})?$/m,
  pin: /^([1-9]$|^[1][0-6])?$/m,
  brightness: /^([0-9]$|^[1-9][0-9]$|^[1][0]{2})?$/m,
  wait: /^([0-9]$|^[1-9][0-9]$|^[1-9][0-9]{2}|^[1][0]{3})?$/m,
  status: /^([0-1])?$/m,
  mode: /^([0-2])?$/m,
  color: /^([0-2])?$/m,
  type: /^([0])?$/m,
  command: /^([0-4])?$/m,
};
