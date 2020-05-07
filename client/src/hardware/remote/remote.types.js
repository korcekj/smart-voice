import { inputTypes } from '../hardware.inputs';

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

export const remoteCommands = {
  POWER: 0,
  VOLUME_UP: 1,
  VOLUME_DOWN: 2,
  CHANNEL_UP: 3,
  CHANNEL_DOWN: 4,
};
