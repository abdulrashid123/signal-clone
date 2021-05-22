import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyBcvNCXMEptreH1s33gxK2LZ5ifM8tyAoY",
    authDomain: "signal-clone-f904e.firebaseapp.com",
    projectId: "signal-clone-f904e",
    storageBucket: "signal-clone-f904e.appspot.com",
    messagingSenderId: "877815884934",
    appId: "1:877815884934:web:8b4014f90eb8444a7f3507"
  };

let app;
if(firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig)
}
else{
    app = firebase.app()
}

const db  = app.firestore()
const auth = app.auth()


export {db,auth}