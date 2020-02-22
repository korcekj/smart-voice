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
  pin: 'pin',
  brightness: 'jas',
  wait: 'pauza',
  status: 'stav',
  mode: 'mód',
  colors: 'farby'
};

export const inputTypes = {
  text: 'text',
  range: 'range',
  checkbox: 'checkbox',
  radio: 'radio',
  color: 'color'
};

export const testInputs = {
  name: /^([\w\W\d]{0,16})?$/m,
  numLeds: /^([1-9](\d){0,2})?$/m,
  frequency: /^([1-9](\d){0,4})?$/m,
  pin: /^([1-9]$|^[1][0-6])?$/m,
  brightness: /^([0-9]$|^[1-9][0-9]$|^[1][0]{2})?$/m,
  wait: /^([0-9]$|^[1-9][0-9]{2}$|^[1][0]{3})?$/m,
  status: /^([0-1])?$/m,
  mode: /^([0-2])?$/m
};

export const ledCreateInputs = {
  name: '',
  numLeds: '',
  pin: ''
};

export const ledUpdateInputs = {
  status: {
    title: false,
    props: {
      type: inputTypes.checkbox
    }
  },
  mode: {
    title: true,
    props: {
      type: inputTypes.radio,
      number: 3
    }
  },
  brightness: {
    title: true,
    props: {
      min: 0,
      max: 100,
      type: inputTypes.range
    }
  },
  colors: {
    title: true,
    props: {
      type: inputTypes.color
    }
  },
  wait: {
    title: true,
    props: {
      min: 0,
      max: 1000,
      type: inputTypes.range
    }
  }
};

export const remoteCreateInputs = {
  name: '',
  frequency: '',
  pin: ''
};

export const capitalize = value =>
  value.charAt(0).toUpperCase() + value.slice(1);
