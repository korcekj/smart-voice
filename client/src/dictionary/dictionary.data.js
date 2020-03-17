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

const setNumber = (args = [], propName) => {
  if (!isInputValid(propName, args[0])) return null;
  return {
    [propName]: args[0]
  };
};

const setColor = (args = [], propName) => {
  const colorIndex = args[0] - 1;
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
  'nastav mod :number': args => setNumber(args, 'mode'),
  'nastav mod na :number': args => setNumber(args, 'mode'),
  'nastavit mod :number': args => setNumber(args, 'mode'),
  'nastavit mod na :number': args => setNumber(args, 'mode'),
  'nastav jas :number': args => setNumber(args, 'brightness'),
  'nastav jas na :number': args => setNumber(args, 'brightness'),
  'nastavit jas :number': args => setNumber(args, 'brightness'),
  'nastavit jas na :number': args => setNumber(args, 'brightness'),
  'nastav pauzu :number': args => setNumber(args, 'wait'),
  'nastav pauzu na :number': args => setNumber(args, 'wait'),
  'nastavit pauzu :number': args => setNumber(args, 'wait'),
  'nastavit pauzu na :number': args => setNumber(args, 'wait'),
  'nastav farbu :number :color': args => setColor(args, 'color'),
  'nastav farbu :number na :color': args => setColor(args, 'color'),
  'nastavit farbu :number :color': args => setColor(args, 'color'),
  'nastavit farbu :number na :color': args => setColor(args, 'color')
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
