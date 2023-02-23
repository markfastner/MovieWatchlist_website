import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import React, { useRef, useState } from 'react';
import '../App.css'
import { db } from '../firebase';

export default function FriendsPage() {
  
  const usernameRef = useRef()
  const [inputValue, setInputValue] = useState('')

  const [error, setError] = useState("")

  const handleClearClick = () =>
  {
    setInputValue('')
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  function handleAddFriend(e) {
    e.preventDefault()
    const username = usernameRef
    // Check if the user is authenticated
    // if (this.state.user) {
    //   // Add a new friend to the Firebase database
    //   firebase
    //     .database()
    //     .ref('friends')
    //     .push(friend);
    // } else {
    //   alert('Please sign in to add a friend.');
    // }
  };

  
    
  
   function handleRemoveFriend() {
      // Check if the user is authenticated
      // if (this.state.user) {
      //   // Remove a friend from the Firebase database
      //   firebase
      //     .database()
      //     .ref(`friends/${id}`)
      //     .remove();
      // } else {
      //   alert('Please sign in to delete a friend.');
      // }
    };
 
    return (
      <div>
    {/* Render the friends list */}
    <h1>
    Friends
    </h1>
    <div>
      <form onSubmit={handleAddFriend}>
        <button type='submit' onClick={handleClearClick} class="btn btn-primary my-6 w-32 duration-200 bg-slate-500 hover:bg-slate-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Add Friends</button>
        <input type='text' ref={usernameRef} onChange={handleInputChange} value={inputValue} placeholder="Friend's Username"></input>
      </form>
    </div>
  </div>
  );}