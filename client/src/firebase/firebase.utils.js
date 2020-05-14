// Importovanie potrebnych packages
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Firebase konfiguria potrebna na komunikaciu s Realtime DB
var firebaseConfig = {
  apiKey: 'AIzaSyCdfAn6E1HeFjtaCjRsLgk--Eqn6tYnxXY',
  authDomain: 'smart-voice-application.firebaseapp.com',
  databaseURL: 'https://smart-voice-application.firebaseio.com',
  projectId: 'smart-voice-application',
  storageBucket: 'smart-voice-application.appspot.com',
  messagingSenderId: '397476117170',
  appId: '1:397476117170:web:3a351e7bec52dc314fa7ab',
  measurementId: 'G-NT0MMCKNH3',
};

// Inicializacia Firebase
firebase.initializeApp(firebaseConfig);

// Funkcia na vytvorenie pouzivatela v DB
export const createUser = async (user, otherData) => {
  if (!user) return;

  // Vytvorenie referencie pouzivatela
  const userRef = database.ref('/users/' + user.uid);
  const snapshot = await userRef.once('value');

  // Overenie existencie pouzivatela
  if (!snapshot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date().toISOString();

    try {
      // Zapis pouzivatela do DB
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...otherData,
      });
    } catch (error) {
      // Vypis chybovej spravy
      console.error('Error: Create user ', error);
    }
  }

  return userRef;
};

// Funkcia na ziskanie aktualneho pouzivatela z Firebase
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

// Funkcia na ziskanie dostupnych hardverovych modulov daneho pouzivatela
export const getAvailableModules = async (uid) => {
  let modules = {};

  if (!uid) return modules;

  // Vytvorenie referencie pouzivatela
  const userModulesRef = database.ref('/users/' + uid + '/modules');
  const snapshot = await userModulesRef.once('value');

  // Overenie existencie pouzivatela
  if (!snapshot.exists()) {
    return modules;
  }

  // Vytiahnutie vsetkych ID modulov, ktore pouzivatel vlastni
  const moduleIds = Object.keys(snapshot.val()).map((key) => key);
  // Spracovanie dat najdenych modulov
  modules = await mapModulesToObjects(moduleIds);

  // Vratenie dat
  return modules;
};

// Funkcia na vytvorenie hardveroveho modulu
export const createModule = async (uid, mac) => {
  if (!mac || !uid) return;

  // Vytvorenie referencie modulu
  const userModuleRef = database.ref('/users/' + uid + '/modules/' + mac);
  const userModuleSnapshot = await userModuleRef.once('value');

  // Overenie existencie modulu
  if (userModuleSnapshot.exists()) return;

  try {
    // Pridanie vlastnictva modulu do DB danemu pouzivatelovi
    const createdAt = new Date().toISOString();
    await userModuleRef.set({ createdAt });
  } catch (error) {
    // Vypis chybovej spravy na konzolu
    console.error('Error: Create module ', error);
  }

  // Vytvorenie referencie modulu
  const moduleRef = database.ref('/modules/' + mac);
  const moduleSnapshot = await moduleRef.once('value');

  // Overenie existencie modulu
  if (!moduleSnapshot.exists()) {
    // V pripade, ze dany modul v DB nie je zaregistrovany ako ESP8266 modul tak ho na zaklade jeho MAC vymaze z vlastnictva pouzivatela
    await deleteModule(uid, mac);
    return;
  }

  return moduleRef;
};

// Funkcia na odstranenie vlastnictva modulu v DB daneho pouzivatela
export const deleteModule = async (uid, mac) => {
  if (!mac || !uid) return;

  // Vytvorenie referencie na vlastnictvo modulu
  const moduleRef = database.ref('/users/' + uid + '/modules/' + mac);

  try {
    // Vymazanie modulu z vlastnictva pouzivatela
    await moduleRef.remove();
  } catch (error) {
    // Vypis chybovej spravy
    console.error('Error: Delete module ', error);
  }

  return moduleRef;
};

// Funkcia na ziskanie hardverovej sucasti na zaklade poskytnutych udajov: `moduleId, type, id`
export const getHardware = async (moduleId, type, id) => {
  if (!module || !type || !id) return;

  // Vytvorenie referencie na hardverovu sucast
  const hardwareRef = database.ref(
    '/modules/' + moduleId + '/hardware/' + type + '/' + id
  );
  const hardwareSnapshot = await hardwareRef.once('value');

  // Overenie existencie hardverovej sucasti
  if (!hardwareSnapshot.exists()) return;

  // Vratenie dat z funkcie
  return { ...hardwareSnapshot.val() };
};

// Funkcia na spracovanie dat hardverovych modulov
export const mapModulesToObjects = async (moduleIds) => {
  let modules = {};

  for (let i = 0; i < moduleIds.length; i++) {
    try {
      const id = moduleIds[i];
      // Referencia na konkretny modul zapisany v DB
      const moduleRef = database.ref('/modules/' + id);
      const snapshot = await moduleRef.once('value');
      // Overenie existencie dat
      if (!snapshot.exists()) continue;
      // Naplnenie objektu datami z DB
      modules[id] = { ...snapshot.val() };
    } catch (error) {
      continue;
    }
  }

  return modules;
};

// Export Auth, Databazy a Google Provider
export const auth = firebase.auth();
export const database = firebase.database();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default firebase;
