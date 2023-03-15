import { data } from "autoprefixer"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

// Initializes a connection with team's Firebase project
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

//authentication
export const auth = app.auth()
//realtime db
const database = app.firestore()
export const db = {
  users: database.collection('users'),
  friends: database.collection('friends'),
  movies: database.collection('movies'),
  watchlists: database.collection('watchlists'),
  chats: database.collection('chats'),
  ratings: database.collection('ratings'),
  comments: database.collection('comments'),
  profiles: database.collection('profiles')
}
export default app
