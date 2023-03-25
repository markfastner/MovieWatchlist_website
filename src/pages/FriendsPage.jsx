import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import React, { useRef, useState, useEffect } from 'react';
import '../App.css';
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, db } from '../firebase';
import FriendsList from './FriendsList';
import Chat from '../components/chat/Chat.jsx';

export default function FriendsPage() {
    const usernameRef = useRef()
    const {currentUser} = useAuth()
    const [inputValue, setInputValue] = useState('')

    const [username, setUsername] = useState('');

    const [addFriendError, setAddFriendError] = useState('')
    const user = auth.currentUser;
    const userRef = db.users.doc(currentUser.uid);
    const [senderUsername, setSenderUsername] = useState('')
    const [acceptFriendError, setAcceptFriendError] = useState('')

    const [error, setError] = useState('')

    const handleClearClick = () =>
    {
        setInputValue('')
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    
    userRef.get().then((doc) => {
        if(doc.exists) {setSenderUsername(doc.data().username)}
    })
    async function handleAddFriend(e) {
        e.preventDefault()
        const queriedUsername = usernameRef.current.value;
        const recipientSnapshot = await db.users.where("username", "==", queriedUsername).get();
        
        if(!(recipientSnapshot.empty)) {
            const recipientId = recipientSnapshot.docs[0].id
            const recipientPendingRequest = await db.users.doc(recipientId).collection('pending-friends').where('pending', '==', senderUsername).get()
            if(senderUsername == queriedUsername)
            {
                setAddFriendError("That is you.")
                return
            }
            if((recipientPendingRequest.empty))
            {
                const pendingCollection = db.users.doc(recipientId).collection('pending-friends');
                pendingCollection.add({pending: senderUsername})
            } else {
                setAddFriendError("Your friend request is pending, please wait.")
                return
            }
        } else {
            setAddFriendError("User does not exist.")
            return
        }
      }

     
    const friendRequestsRef = userRef.collection('pending-friends');
    const [friendRequests, setFriendRequests] = useState([]);
    
    useEffect(() => {
        const unsubscribe = db
          .users
          .doc(currentUser.uid)
          .collection("pending-friends")
          .onSnapshot((snapshot) => {
            const pendingList = snapshot.docs.map((doc) => 
            {
                
                const data = doc.data();
                data.id = doc.id; // Add the document ID to the data object
                return data;
            });
            setFriendRequests(pendingList);
        });
        return unsubscribe;
      }, [currentUser.uid]);

    const acceptFriendRequest = async (friendRequest) => {
        const recipientSnapshot = await db.users.where("username", "==", friendRequest.pending).get();
        const recipientId = recipientSnapshot.docs[0].id
        db.users.doc(currentUser.uid).collection('friends').add({friend: friendRequest.pending})
        db.users.doc(recipientId).collection('friends').add({friend: senderUsername})
      db.users.doc(currentUser.uid).collection('pending-friends').doc(friendRequest.id).delete();
      setAcceptFriendError("Friend Added.")
      };

    const declineFriendRequest = async (friendRequest) => {
        const a = db.users.doc(currentUser.uid).collection('pending-friends').doc(friendRequest.id).delete();
        setAcceptFriendError("Friend Declined.")
    };

    


    return (
      <div>
    {/* Render the friends list */}
    <h1>
    Friends 
    </h1>
    <div>
      {/* <button type='show' class='btn' onClick={RenderFriendsList}>Show Friends List</button> */}
        <RenderFriendsList/>
       
    </div>
    <div>
        {addFriendError}
        <form onSubmit={handleAddFriend}>
        <input type='text' ref={usernameRef} onChange={handleInputChange} value={inputValue} placeholder="Friend's Username"></input>
        <button type='submit'  class="btn btn-primary my-6 w-32 duration-200 bg-slate-500 hover:bg-slate-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Add Friends</button>
        </form>
        
        </div>
            {acceptFriendError}
        <div>
            {friendRequests.map((friendRequest) => (
            <div key={friendRequest.pending}>
            {friendRequest.pending}
            <button type='button' onClick={() => acceptFriendRequest(friendRequest)} class="btn btn-primary my-6 w-10 duration-200 bg-slate-500 hover:bg-slate-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">+</button>
            <button type='button' onClick={() => declineFriendRequest(friendRequest)} class="btn btn-primary my-6 w-10 duration-200 bg-slate-500 hover:bg-slate-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">x</button>
            </div>
        ))}  
        </div>

    <div>
        <Chat user={user} />
    </div>

    <div>
    </div>
        </div>
    );
}

export function RenderFriendsList() {

    const {currentUser} = useAuth();
    const userId = currentUser.uid;
    
    return (
        <div>
        <FriendsList userId={userId} />
        </div>
    );
}