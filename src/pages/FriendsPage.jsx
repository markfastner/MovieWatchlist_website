import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import React from 'react';
import '../App.css'

function FriendsPage() {
 return (
   <div>
     {/* Render the friends list */}
     <h1>
     HELLO JAKE
         
     </h1>
   </div>
 );
}
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
  };

  render() {
    return (
      <div>
        {/* Render the friends list */}
      </div>
    );
  }
}


export default FriendsPage;