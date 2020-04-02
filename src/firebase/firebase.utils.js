import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDCFfCS7lxNzqT8V5zVtmix1wagorNguO8',
  authDomain: 'crwn-db-a4b3c.firebaseapp.com',
  databaseURL: 'https://crwn-db-a4b3c.firebaseio.com',
  projectId: 'crwn-db-a4b3c',
  storageBucket: 'crwn-db-a4b3c.appspot.com',
  messagingSenderId: '896882204192',
  appId: '1:896882204192:web:0120d51e5a732674dc2645',
  measurementId: 'G-DELV09TKS6'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
