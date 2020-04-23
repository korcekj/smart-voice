export const hardwareTypes = {
  led: 'led',
  remote: 'remote',
};

export const hardwareSlovakTypes = {
  led: 'žiarovka',
  remote: 'diaľkový ovládač',
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

export const remoteCreateInputs = {
  name: {
    props: {
      value: '',
      type: inputTypes.text,
    },
  },
  frequency: {
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
  type: {
    props: {
      value: '0',
      type: inputTypes.select,
      options: ['sony'],
    },
  },
};

export const remoteUpdateInputs = {
  power: {
    title: false,
    display: true,
    props: {
      disabled: [],
      altName: 'command',
      icon: 'power',
      desc: 'Zapnutie / Vypnutie',
      type: inputTypes.button,
    },
  },
  volumeUp: {
    title: false,
    display: true,
    props: {
      disabled: [],
      altName: 'command',
      icon: 'volumeUp',
      desc: 'Zvýšenie hlasitosti',
      type: inputTypes.button,
    },
  },
  volumeDown: {
    title: false,
    display: true,
    props: {
      disabled: [],
      altName: 'command',
      icon: 'volumeDown',
      desc: 'Zníženie hlasitosti',
      type: inputTypes.button,
    },
  },
  channelUp: {
    title: false,
    display: true,
    props: {
      disabled: [],
      altName: 'command',
      icon: 'channelUp',
      desc: 'Nasledujúci kanál',
      type: inputTypes.button,
    },
  },
  channelDown: {
    title: false,
    display: true,
    props: {
      disabled: [],
      altName: 'command',
      icon: 'channelDown',
      desc: 'Predchádzajúci kanál',
      type: inputTypes.button,
    },
  },
  command: {
    title: false,
    display: false,
    props: {
      disabled: [],
    },
  },
};

export const capitalize = (value) =>
  value.charAt(0).toUpperCase() + value.slice(1);
