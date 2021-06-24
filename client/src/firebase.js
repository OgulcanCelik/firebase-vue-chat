import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyCvtwEy2TVxog3dP2BsLOHXh4FwaBCcXdo',
    authDomain: 'fir-chat-6b591.firebaseapp.com',
    projectId: 'fir-chat-6b591',
    storageBucket: 'fir-chat-6b591.appspot.com',
    messagingSenderId: '138297365723',
    appId: '1:138297365723:web:9a7ba45a9467585d2928fe',
});

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const { serverTimestamp } = firebase.firestore.FieldValue;
const firestore = firebase.firestore();

export { auth, firestore, provider, serverTimestamp };
