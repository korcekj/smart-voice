import { isInputValid } from '../hardware/hardware.utils';

const setMode = (nums = []) => {
  if (!isInputValid('mode', nums[0])) return null;
  return {
    mode: nums[0]
  };
};

const DICTIONARY = {
  zapni: () => ({
    status: 1
  }),
  vypni: () => ({
    status: 0
  }),
  'mod :number': setMode,
  'nastav mod :number': setMode,
  'nastav mod na :number': setMode,
  'nastavit mod :number': setMode,
  'nastavit mod na :number': setMode
};

export default DICTIONARY;
