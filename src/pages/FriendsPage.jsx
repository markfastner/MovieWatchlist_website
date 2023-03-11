import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import '../App.css'
import { useAuth } from "./auth/contexts/AuthContext"
import { auth, db, database } from '../firebase';
import Chat from './Chat';
import { useCollectionData } from 'react-firebase-hooks/firestore';


export default function FriendsPage() {
  
  const usernameRef = useRef()
  const {currentUser} = useAuth()
  const [inputValue, setInputValue] = useState('')
  const [addFriendError, setAddFriendError] = useState('')
  const user = auth.currentUser;
  const friendRef = db.friends.doc(user.uid)
  const [readFriendsListError, setReadFriendsListError] = useState('')

  const [error, setError] = useState('')

  const handleClearClick = () =>
  {
    setInputValue('')
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  async function handleAddFriend(e) {
    e.preventDefault()
    const snapshot = await db.users.where("username", "==", usernameRef.current.value).get();
    if(!(snapshot.empty)) {
      let friendRequest = {}
      friendRequest[usernameRef.current.value] = "pending"
      friendRef.update(friendRequest)
      setAddFriendError("Friend request sent.")
    } else {
      setAddFriendError("User does not exist.")
    }
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
  
    //unused currently 2:31am 3/11/23
    
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
      <button type='show' class='btn' onClick={RenderFriendsList}>Show Friends List</button>
        <RenderFriendsList/>
    </div>
    <div>
        {addFriendError}
      <form onSubmit={handleAddFriend}>
        <input type='text' ref={usernameRef} onChange={handleInputChange} value={inputValue} placeholder="Friend's Username"></input>
        <button type='submit'  class="btn btn-primary my-6 w-32 duration-200 bg-slate-500 hover:bg-slate-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Add Friends</button>
      </form>
    </div>
  </div>
  );}

export function RenderFriendsList() {

    var docRef = db.users.doc("zCsrEK96qiZwGcp0LxWRmWl7jTI2");

    docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    db.users.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().username);
        });
    });

    return (
        <p>testing</p>
    )

}



