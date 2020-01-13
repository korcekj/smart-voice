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

export const createUser = async user => {
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
        createdAt
      });
    } catch (error) {
      console.error('Error: Create user ', error);
    }
  }
};

// Utils
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export const auth = firebase.auth();
export const database = firebase.database();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({ prompt: 'select_account' });

export default firebase;
