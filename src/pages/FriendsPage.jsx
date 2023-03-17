import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import React, { useRef, useState } from 'react';
import '../App.css';
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, db } from '../firebase';
import FriendsList from './FriendsList';
import Chat from '../components/chat/Chat.jsx';

export default function FriendsPage() {
   const usernameRef = useRef()
    const {currentUser} = useAuth()
    const [inputValue, setInputValue] = useState('')
    const [addFriendError, setAddFriendError] = useState('')
    const user = auth.currentUser;
    const friendRef = db.friends.doc(user.uid)

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
    }

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
        

    <div>
        <Chat user={user} />
    </div>
        </div>
    );
}

export function RenderFriendsList() {

    const userId = 'zCsrEK96qiZwGcp0LxWRmWl7jTI2';
    
    return (
        <div>
        <FriendsList userId={userId} />
        </div>
    );
}

