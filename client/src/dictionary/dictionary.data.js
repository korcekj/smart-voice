// Importovanie vstupov a konfiguracii hardverovych sucasti
import { hardwareTypes } from '../hardware/hardware.types';
import { setNumber, setColor } from '../hardware/hardware.utils';
import { ledCommands, defaultColors } from '../hardware/led/led.types';
import { remoteCommands } from '../hardware/remote/remote.types';

// Slovnik prikazov ako JS object
const DICTIONARY = {
  [hardwareTypes.led]: {
    zapnut: () => setNumber([ledCommands.TURN_ON], 'status'),
    vypnut: () => setNumber([ledCommands.TURN_OFF], 'status'),
    'mod :number': (args) => setNumber(args, 'mode'),
    'nastav mod cislo :number': (args) => setNumber(args, 'mode', -1),
    'nastav mod na cislo :number': (args) => setNumber(args, 'mode', -1),
    'nastavit mod cislo :number': (args) => setNumber(args, 'mode', -1),
    'nastavit mod na cislo :number': (args) => setNumber(args, 'mode', -1),
    'nastav jas cislo :number': (args) => setNumber(args, 'brightness'),
    'nastav jas na cislo :number': (args) => setNumber(args, 'brightness'),
    'nastavit jas cislo :number': (args) => setNumber(args, 'brightness'),
    'nastavit jas na cislo :number': (args) => setNumber(args, 'brightness'),
    'nastav pauzu cislo :number': (args) => setNumber(args, 'wait'),
    'nastav pauzu na cislo :number': (args) => setNumber(args, 'wait'),
    'nastavit pauzu cislo :number': (args) => setNumber(args, 'wait'),
    'nastavit pauzu na cislo :number': (args) => setNumber(args, 'wait'),
    'nastav farbu cislo :number :color': (args) => setColor(args, 'color', -1),
    'nastav farbu cislo :number na :color': (args) =>
      setColor(args, 'color', -1),
    'nastavit farbu cislo :number :color': (args) =>
      setColor(args, 'color', -1),
    'nastavit farbu cislo :number na :color': (args) =>
      setColor(args, 'color', -1),
  },
  [hardwareTypes.remote]: {
    zapnut: () => setNumber([remoteCommands.POWER], 'command'),
    vypnut: () => setNumber([remoteCommands.POWER], 'command'),
    'pridat hlasitost': () => setNumber([remoteCommands.VOLUME_UP], 'command'),
    'zvysit hlasitost': () => setNumber([remoteCommands.VOLUME_UP], 'command'),
    'pridat zvuk': () => setNumber([remoteCommands.VOLUME_UP], 'command'),
    'zvysit zvuk': () => setNumber([remoteCommands.VOLUME_UP], 'command'),
    'odobrat hlasitost': () =>
      setNumber([remoteCommands.VOLUME_DOWN], 'command'),
    'znizit hlasitost': () =>
      setNumber([remoteCommands.VOLUME_DOWN], 'command'),
    'odobrat zvuk': () => setNumber([remoteCommands.VOLUME_DOWN], 'command'),
    'znizit zvuk': () => setNumber([remoteCommands.VOLUME_DOWN], 'command'),
    'nasledujuci kanal': () =>
      setNumber([remoteCommands.CHANNEL_UP], 'command'),
    'dalsi kanal': () => setNumber([remoteCommands.CHANNEL_UP], 'command'),
    'predchadzajuci kanal': () =>
      setNumber([remoteCommands.CHANNEL_DOWN], 'command'),
    'predosly kanal': () => setNumber([remoteCommands.CHANNEL_DOWN], 'command'),
  },
};

// Slovnik farieb ako JS objekt
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
  cierno: defaultColors.black,
};

export default DICTIONARY;
