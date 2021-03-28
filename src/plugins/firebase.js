
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: 'AIzaSyAvv2a15kUYIMgADSozpGdyZNtVAKQ_DtA',
  authDomain: 'easy-manage-system.firebaseapp.com',
  databaseURL: 'https://easy-manage-system-default-rtdb.firebaseio.com',
  projectId: 'easy-manage-system',
  storageBucket: 'easy-manage-system.appspot.com',
  messagingSenderId: '72872811370',
  appId: '1:72872811370:web:8515311ed920a3076ea313',
  measurementId: 'G-C5LW219H0C'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

firebase.firestore().collection('test').add({ test: 'dfd' })
  .then(r => console.log(r))
  .catch(e => console.error(e))
