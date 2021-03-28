import Vue from 'vue'
import firebase from 'firebase/app'
import firebaseConfig from '../../firebaseConfig'
import 'firebase/analytics'

import 'firebase/auth'
import 'firebase/firestore'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// firebase.firestore().collection('test').add({ test: 'aaa' })
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

Vue.prototype.$firebase = firebase
