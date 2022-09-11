import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import  'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDAslzvTpqJnYI1bJFmZPCQn0y24R0zeeY",
    authDomain: "incubation-32e67.firebaseapp.com",
    projectId: "incubation-32e67",
    storageBucket: "incubation-32e67.appspot.com",
    messagingSenderId: "476873220508",
    appId: "1:476873220508:web:2a4f13a28bd242c790e859",
    measurementId: "G-6BNPV1LFHL"
  };


export default firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore(firebase)