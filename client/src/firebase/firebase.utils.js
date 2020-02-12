import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// My web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCdfAn6E1HeFjtaCjRsLgk--Eqn6tYnxXY',
  authDomain: 'smart-voice-application.firebaseapp.com',
  databaseURL: 'https://smart-voice-application.firebaseio.com',
  projectId: 'smart-voice-application',
  storageBucket: 'smart-voice-application.appspot.com',
  messagingSenderId: '397476117170',
  appId: '1:397476117170:web:3a351e7bec52dc314fa7ab',
  measurementId: 'G-NT0MMCKNH3'
};

// Initializing the Firebase
firebase.initializeApp(firebaseConfig);

// Utils
export const createUser = async (user, otherData) => {
  if (!user) return;

  const userRef = database.ref('/users/' + user.uid);
  const snapshot = await userRef.once('value');

  if (!snapshot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date().toISOString();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...otherData
      });
    } catch (error) {
      console.error('Error: Create user ', error);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export const getAvailableModules = async uid => {
  let modules = {};

  if (!uid) return modules;

  const userModulesRef = database.ref('/users/' + uid + '/modules');
  const snapshot = await userModulesRef.once('value');

  if (!snapshot.exists()) {
    return modules;
  }

  const modulesId = Object.keys(snapshot.val()).map(key => key);
  modules = await mapModulesToObjects(modulesId);

  return modules;
};

export const createModule = async (uid, mac) => {
  if (!mac || !uid) return;

  const userModuleRef = database.ref('/users/' + uid + '/modules/' + mac);
  const userModuleSnapshot = await userModuleRef.once('value');

  if (userModuleSnapshot.exists()) return;

  try {
    const createdAt = new Date().toISOString();
    await userModuleRef.set({ createdAt });
  } catch (error) {
    console.error('Error: Create module ', error);
  }

  const moduleRef = database.ref('/modules/' + mac);
  const moduleSnapshot = await moduleRef.once('value');

  if (!moduleSnapshot.exists()) {
    await deleteModule(uid, mac);
    return;
  }

  return moduleRef;
};

export const deleteModule = async (uid, mac) => {
  if (!mac || !uid) return;

  const moduleRef = database.ref('/users/' + uid + '/modules/' + mac);

  try {
    await moduleRef.remove();
  } catch (error) {
    console.error('Error: Delete module ', error);
  }

  return moduleRef;
};

export const getHardware = async (moduleId, type, id) => {
  if (!module || !type || !id) return;

  const hardwareRef = database.ref(
    '/modules/' + moduleId + '/hardware/' + type + '/' + id
  );
  const hardwareSnapshot = await hardwareRef.once('value');

  if (!hardwareSnapshot.exists()) return;

  return { ...hardwareSnapshot.val() };
};

export const mapModulesToObjects = async modulesId => {
  let modules = {};

  for (let i = 0; i < modulesId.length; i++) {
    try {
      const id = modulesId[i];
      const moduleRef = database.ref('/modules/' + id);
      const snapshot = await moduleRef.once('value');
      if (!snapshot.exists()) continue;
      modules[id] = { ...snapshot.val() };
    } catch (error) {
      continue;
    }
  }

  return modules;
};

export const auth = firebase.auth();
export const database = firebase.database();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default firebase;
