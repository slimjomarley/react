import firebase from 'firebase/app';    
import "firebase/auth";
import "firebase/database";

import "firebase/storage";
var firebaseConfig = {
    apiKey: "AIzaSyDvCUKQS2EFaF2_rtLruErMhtKIdyYZY08",
    authDomain: "react-redux-firebase-c2bd8.firebaseapp.com",
    projectId: "react-redux-firebase-c2bd8",
    storageBucket: "react-redux-firebase-c2bd8.appspot.com",
    messagingSenderId: "691477242133",
    databaseURL:'https://react-redux-firebase-c2bd8-default-rtdb.firebaseio.com/',
    appId: "1:691477242133:web:2a9f02bdfbc08d2e69491c",
    measurementId: "G-44XKJRP3G1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;