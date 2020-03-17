import DICTIONARY, { COLORS } from './dictionary.data';

export const translate = transcript => {
  // PARSING AND TOKENIZING
  const normalizedString = normalizeString(transcript);
  const normalizedArray = normalizedString.split(' ');
  const { tokenizedArray, valueArray } = tokenizeStringArray(normalizedArray);
  const dictionaryKey = tokenizedArray.join(' ');

  // ACCESS TO FUNCTION
  const returnedFun = DICTIONARY[dictionaryKey];
  if (!returnedFun) return null;

  // RETURN RETURNED OBJECT FROM FUNCTION ABOVE
  return returnedFun(valueArray);
};

export const normalizeString = string => {
  const lowerCasedString = string.toLowerCase();
  return lowerCasedString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const tokenizeStringArray = stringArray => {
  const valueArray = [];

  const tokenizedArray = stringArray.map(value => {
    if (!isNaN(value)) {
      valueArray.push(Number(value));
      return ':number';
    } else if (COLORS[value]) {
      valueArray.push(COLORS[value]);
      return ':color';
    }
    return value;
  });

  return {
    tokenizedArray,
    valueArray
  };
};
