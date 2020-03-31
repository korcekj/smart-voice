import { isInputValid } from '../hardware/hardware.utils';

const defaultColors = {
  red: {
    r: 255,
    g: 0,
    b: 0
  },
  blue: {
    r: 0,
    g: 0,
    b: 255
  },
  green: {
    r: 0,
    g: 255,
    b: 0
  },
  white: {
    r: 255,
    g: 255,
    b: 255
  },
  black: {
    r: 0,
    g: 0,
    b: 0
  }
};

const setNumber = (args = [], propName, off = 0) => {
  const number = args[0] + off;
  if (!isInputValid(propName, number)) return null;
  return {
    [propName]: number
  };
};

const setColor = (args = [], propName, off = 0) => {
  const colorIndex = args[0] + off;
  if (!isInputValid(propName, colorIndex)) return null;
  return {
    colors: {
      [`${propName}${colorIndex}`]: args[1]
    }
  };
};

const DICTIONARY = {
  zapni: () => setNumber([1], 'status'),
  vypni: () => setNumber([0], 'status'),
  'mod :number': args => setNumber(args, 'mode'),
  'nastav mod cislo :number': args => setNumber(args, 'mode', -1),
  'nastav mod na cislo :number': args => setNumber(args, 'mode', -1),
  'nastavit mod cislo :number': args => setNumber(args, 'mode', -1),
  'nastavit mod na cislo :number': args => setNumber(args, 'mode', -1),
  'nastav jas cislo :number': args => setNumber(args, 'brightness'),
  'nastav jas na cislo :number': args => setNumber(args, 'brightness'),
  'nastavit jas cislo :number': args => setNumber(args, 'brightness'),
  'nastavit jas na cislo :number': args => setNumber(args, 'brightness'),
  'nastav pauzu cislo :number': args => setNumber(args, 'wait'),
  'nastav pauzu na cislo :number': args => setNumber(args, 'wait'),
  'nastavit pauzu cislo :number': args => setNumber(args, 'wait'),
  'nastavit pauzu na cislo :number': args => setNumber(args, 'wait'),
  'nastav farbu cislo :number :color': args => setColor(args, 'color', -1),
  'nastav farbu cislo :number na :color': args => setColor(args, 'color', -1),
  'nastavit farbu cislo :number :color': args => setColor(args, 'color', -1),
  'nastavit farbu cislo :number na :color': args => setColor(args, 'color', -1)
};

export const COLORS = {
  cervena: defaultColors.red,
  cervenu: defaultColors.red,
  cerveno: defaultColors.red,
  zelena: defaultColors.green,
  zelenu: defaultColors.green,
  zeleno: defaultColors.green,
  modra: defaultColors.blue,
  modru: defaultColors.blue,
  modro: defaultColors.blue,
  biela: defaultColors.white,
  bielu: defaultColors.white,
  bielo: defaultColors.white,
  cierna: defaultColors.black,
  ciernu: defaultColors.black,
  cierno: defaultColors.black
};

export default DICTIONARY;
