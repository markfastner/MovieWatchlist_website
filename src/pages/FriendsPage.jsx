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

    const [username, setUsername] = useState('');

    const [addFriendError, setAddFriendError] = useState('')
    const user = auth.currentUser;
    const userRef = db.users.doc(currentUser.uid);
    const [senderUsername, setSenderUsername] = useState('')

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
        const queriedUsername = usernameRef.current.value;
        const recipientSnapshot = await db.users.where("username", "==", queriedUsername).get();
        
        if(!(recipientSnapshot.empty)) {
            const recipientId = recipientSnapshot.docs[0].id
            userRef.get().then((doc) => {
                if(doc.exists) {setSenderUsername(doc.data().username)}
            })
            const recipientPendingRequest = await db.users.doc(recipientId).collection('pending-friends').where('pending', '==', senderUsername).get()
            if((recipientPendingRequest.empty))
            {
                // const db = firebase.firestore();
                // const docRef = db.collection("myCollection").doc("myDoc");
                // const subCollectionRef = docRef.collection("mySubCollection");

                // docRef.set({ name: "John Doe" });
                // subCollectionRef.add({ age: 25 });
                const pendingCollection = db.users.doc(recipientId).collection('pending-friends');
                pendingCollection.add({pending: senderUsername})
            } else {
                setAddFriendError("You have a pending request, cannot send more requests at this time.")
                return
            }
            setAddFriendError(senderUsername)
        } else {
            setAddFriendError("User does not exist.")
            return
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

    <div>
    {/* <ul>
      {friendRequests.map((friendRequest) => (
        <li key={friendRequest.id}>
          {friendRequest.sender} wants to be your friend.
          {friendRequest.status === 'pending' && (
<>
<button onClick={() => handleAccept(friendRequest.id)}>Accept</button>
<button onClick={() => handleReject(friendRequest.id)}>Reject</button>
</>
)}
{friendRequest.status === 'accepted' && <span>Friend request accepted.</span>}
{friendRequest.status === 'rejected' && <span>Friend request rejected.</span>}
</li>
))}
</ul> */}
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