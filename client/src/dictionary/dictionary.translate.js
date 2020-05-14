// Importovanie slovnika prikazov a slovnika farieb
import DICTIONARY, { COLORS } from './dictionary.data';

// Funkcia sluziaca na prelozenie hlasoveho vstupu na hlasovy prikaz
export const translate = (hardwareType, transcript) => {
  // V tejto casti prebieha spracovanie vstupu a jeho tokenizacia na parametre a hodnoty
  const normalizedString = normalizeString(transcript);
  const normalizedArray = normalizedString.split(' ');
  const { tokenizedArray, valueArray } = tokenizeStringArray(normalizedArray);
  const dictionaryKey = tokenizedArray.join(' ');

  // Ziskanie navratovej funkcie zo slovnika prikazov
  const returnedFun = DICTIONARY[hardwareType][dictionaryKey];
  // Overenie existencie hlasoveho prikazu
  if (!returnedFun) return null;

  // Zavolanie ziskanej funkcie: `returnedFun` v pripade ze hlasovy prikaz existoval
  return returnedFun(valueArray);
};

// Funkcia sluziaca na spracovanie hlasoveho vstupu v textovej podobe
export const normalizeString = (string) => {
  // Zmena vstupu na male pismena
  const lowerCasedString = string.toLowerCase();
  // Normalizacia vstupu a nahradenie odstranenie diakritickych znamienok ako su napriklad makcen, dlzen, ...
  return lowerCasedString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Funkcia sluziaca na tokenizaciu hlasoveho vstupu v textovej podobe
export const tokenizeStringArray = (stringArray) => {
  const valueArray = [];

  const tokenizedArray = stringArray.map((value) => {
    if (!isNaN(value)) {
      // V pripade ze sa jedna o ciselnu hodnotu, nahrat ju parametrom: `:cislo` a jej hodnotu uchovaj v poli: `valueArray`
      valueArray.push(Number(value));
      return ':number';
    } else if (COLORS[value]) {
      // V pripade ze sa jedna o "farebnu" hodnotu, nahrat ju parametrom: `:color` a jej hodnotu uchovaj v poli: `valueArray`
      valueArray.push(COLORS[value]);
      return ':color';
    }
    return value;
  });

  // Funkcia vrati parametrizovany vstup a jeho hodnoty
  return {
    tokenizedArray,
    valueArray,
  };
};
