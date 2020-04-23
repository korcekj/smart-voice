import { inputTypes } from '../hardware.inputs';

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
