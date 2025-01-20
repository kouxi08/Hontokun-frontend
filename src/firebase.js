import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.json';


const firebase = initializeApp(firebaseConfig);
export const firebaseApp = () => {
  return firebase;
};

export default firebase;
