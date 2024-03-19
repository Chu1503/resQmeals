import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFjOWyZGpEsNrJ-EGqTYs5mXwunK3aj-c",
    authDomain: "resqmeals.firebaseapp.com",
    projectId: "resqmeals",
    storageBucket: "resqmeals.appspot.com",
    messagingSenderId: "349457908091",
    appId: "1:349457908091:web:6da1849fc6ceca5ecc3dde",
    measurementId: "G-9W7SZ66V6E"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth (app)
const provider = new GoogleAuthProvider();
export {auth, provider};