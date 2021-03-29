import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import store from '../store'
import router from '../router'
import 'firebase/database'
import 'firebase/firebase-storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// firebase.firestore().collection('test').add({ test: 'aaa' })
//   .then(r => console.log(r))
//   .catch(e => console.error(e))

Vue.prototype.$firebase = firebase
Vue.prototype.$isFirebaseAuth = false

firebase.auth().onAuthStateChanged((user) => {
  Vue.prototype.$isFirebaseAuth = true
  console.log(user)
  if (user) {
    router.push('/usermain')
  } else {
    router.push('/sign')
  }
  //  store.commit('setUser', user)
  store.dispatch('getUser', user)
})
