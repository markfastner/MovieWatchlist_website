import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import React, { useRef, useState } from 'react';
import '../App.css';
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, db } from '../firebase';
import FriendsList from './FriendsList';

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
        <button onClick={RenderFriendsList} class="btn btn-primary my-6 w-32 duration-200 bg-slate-500 hover:bg-slate-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Show Friends</button>
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
    );
}

export function RenderFriendsList() {

    const friendsList = [];

    db.users.doc('zCsrEK96qiZwGcp0LxWRmWl7jTI2').collection("friends").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            friendsList.push(doc.data().friend);
        });
    });

    console.log(friendsList);
    var testing = friendsList.pop();
    console.log(testing);

    let friendsListStr = 'test';
    friendsList.forEach(element => friendsListStr += element);
    console.log(friendsListStr);

    const userId = 'zCsrEK96qiZwGcp0LxWRmWl7jTI2';
    
    return (
        <div>
        <FriendsList userId={userId} />
        </div>
    );
}
