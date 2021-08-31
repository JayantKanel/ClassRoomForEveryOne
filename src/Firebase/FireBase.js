import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAGUUdcW3sOmScfBvsXpFg_BUnOfVp_HKg",
  authDomain: "classroom-a40e2.firebaseapp.com",
  projectId: "classroom-a40e2",
  storageBucket: "classroom-a40e2.appspot.com",
  messagingSenderId: "318921005108",
  appId: "1:318921005108:web:b6eda71eaec98b888a9261"
});

const db = firebaseApp.firestore();
export default db;
