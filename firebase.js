import * as firebase from 'firebase';
import 'firebase/firestore';
import app from 'firebase/app'
import config from './config'

const firebaseConfig = {
    apiKey: config.FIREBASE_API,
    authDomain: config.FIREBASE_AUTHDOMAIN,
    projectId: config.FIREBASE_PROJECTID,
    storageBucket: config.FIREBASE_STORAGEBUCKET,
    messagingSenderId: config.FIREBASE_MESSAGESSENDINGID,
    appId: config.FIREBASE_APPID
  };

  
//initialize firebase

let app_user;
if(firebase.apps.length===0){
  app_user = firebase.initializeApp(firebaseConfig);
  app.firestore().settings({ experimentalForceLongPolling: true })
}else{
  app_user = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();


export {auth,db};