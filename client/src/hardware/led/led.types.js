import { inputTypes } from '../hardware.inputs';

// Objekt vstupov sluziacich pre vytvorenie LED
export const ledCreateInputs = {
  name: {
    props: {
      value: '',
      type: inputTypes.text,
    },
  },
  numLeds: {
    props: {
      value: '',
      type: inputTypes.text,
    },
  },
  pin: {
    props: {
      value: '',
      type: inputTypes.text,
    },
  },
};

// Objekt vstupov sluziacich pre aktualizaciu LED
export const ledUpdateInputs = {
  status: {
    title: false,
    display: true,
    props: {
      disabled: [],
      type: inputTypes.checkbox,
    },
  },
  mode: {
    title: true,
    display: true,
    props: {
      number: 3,
      disabled: [],
      type: inputTypes.radio,
    },
  },
  brightness: {
    title: true,
    display: true,
    props: {
      min: 0,
      max: 100,
      step: 5,
      disabled: [],
      type: inputTypes.range,
    },
  },
  colors: {
    title: true,
    display: true,
    props: {
      numbers: [1, 3, 0],
      disabled: [2],
      type: inputTypes.color,
    },
  },
  wait: {
    title: true,
    display: true,
    props: {
      min: 0,
      max: 1000,
      step: 10,
      disabled: [0],
      type: inputTypes.range,
    },
  },
};

// Objekt dostupnych RGB farieb pri rozpoznavani reci na text
export const defaultColors = {
  red: {
    r: 255,
    g: 0,
    b: 0,
  },
  blue: {
    r: 0,
    g: 0,
    b: 255,
  },
  green: {
    r: 0,
    g: 255,
    b: 0,
  },
  white: {
    r: 255,
    g: 255,
    b: 255,
  },
  black: {
    r: 0,
    g: 0,
    b: 0,
  },
};

// Objekt dostupnych statickych prikazov pre LED
export const ledCommands = {
  TURN_OFF: 0,
  TURN_ON: 1,
};
