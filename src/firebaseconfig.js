import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgqrrvUFBZxE6RTYChFV9WQnKv645D0J0",
  authDomain: "sgm-its.firebaseapp.com",
  projectId: "sgm-its",
  storageBucket: "sgm-its.appspot.com",
  messagingSenderId: "1033434069496",
  appId: "1:1033434069496:web:2d9c8ada60725e6408fe0d",
  measurementId: "G-PPHTRV3QPG"
};

const fire = firebase.initializeApp(firebaseConfig);
const auth = fire.auth();

export {auth}