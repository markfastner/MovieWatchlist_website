import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import React from 'react';
import '../App.css'
import { db } from '../firebase';

function FriendsPage() {
  class Friends extends React.Component {
    state = {
      friends: [],
      user: null
    };
  
    componentDidMount() {
      // Initialize Firebase
      firebase.initializeApp({
        apiKey: 'YOUR_API_KEY',
        authDomain: 'YOUR_AUTH_DOMAIN',
        databaseURL: 'YOUR_DATABASE_URL',
      });
  
      // Listen for changes to the user's authentication state
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user });
        } else {
          this.setState({ user: null });
        }
      });
  
      // Listen for changes to the friends list
      firebase
        .database()
        .ref('friends')
        .on('value', (snapshot) => {
          this.setState({ friends: snapshot.val() });
        });
    }
  
    handleAddFriend = (friend) => {
      // Check if the user is authenticated
      if (this.state.user) {
        // Add a new friend to the Firebase database
        firebase
          .database()
          .ref('friends')
          .push(friend);
      } else {
        alert('Please sign in to add a friend.');
      }
    };
  
    handleDeleteFriend = (id) => {
      // Check if the user is authenticated
      if (this.state.user) {
        // Remove a friend from the Firebase database
        firebase
          .database()
          .ref(`friends/${id}`)
          .remove();
      } else {
        alert('Please sign in to delete a friend.');
      }
    };
  
    handleEditFriend = (id, name) => {
      // Check if the user is authenticated
      if (this.state.user) {
        // Update a friend in the Firebase database
        firebase
          .database()
          .ref(`friends/${id}`)
          .update({ name });
      } else {
        alert('Please sign in to edit a friend.');
      }
    }
  }
 
    return (
      <div>
    {/* Render the friends list */}
    <h1>
    Friends
    </h1>
    <div>
    <button class="btn btn-primary my-6 w-32 duration-200 bg-slate-500 hover:bg-slate-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" type='button' onClick={FriendsPage.handleAddFriend}>Add Friends</button>
    </div>
  </div>
  );
};

export default FriendsPage;