import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBwCMAgq12la8ADfWF5psfY63n7CftMJwk",
    authDomain: "clam-fantasy-football.firebaseapp.com",
    databaseURL: "https://clam-fantasy-football.firebaseio.com",
    projectId: "clam-fantasy-football",
    storageBucket: "clam-fantasy-football.appspot.com",
    messagingSenderId: "744631855671"
};

firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const firebaseFacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const firebaseDatabase = firebase.database;
