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
      <div className = "flex-col justify-center items-center relative bg-blue-200 min-h-screen">
        <div className = "flex bg-green-400 py-10">
          <ul className ="text-white px-10 space-x-[5px]">
            Friends
            Online
            All 
            Pending
          </ul>
          
        </div>
        <div>
        <form className="max-w-5xl px-10">
              <div className="relative">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                  </svg>
                  <input
                      type="text"
                      placeholder="Search for friends"
                      className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                  />
              </div>
          </form>

        </div>
      
      </div>
    </div>
  );
};

export default FriendsPage;