import firebase from 'firebase';

const firebaseConfig = {
	// Your Credentials
    apiKey: "AIzaSyBOecR0DnBMO1XOhltUWyf7k439Fh-E43E",
    authDomain: "runtimedb-a3bac.firebaseapp.com",
    projectId: "runtimedb-a3bac",
    storageBucket: "runtimedb-a3bac.appspot.com",
    messagingSenderId: "947197914227",
    appId: "1:947197914227:web:37ce1d8cc049a12aa20e06",
    measurementId: "G-PZGMS8LZ0H"
};
	
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;
