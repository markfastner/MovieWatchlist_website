import React, { useEffect, useState } from "react";
import { auth, db } from '../firebase.js';
import { useAuth } from "./auth/contexts/AuthContext";

const FriendsList = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [friendMessage, setFriendMessage] = useState('')
  const [senderUsername, setSenderUsername] = useState('')
  const {currentUser} = useAuth()
  const userRef = db.users.doc(currentUser.uid);
  
  
  userRef.get().then((doc) => {
    if(doc.exists) {setSenderUsername(doc.data().username)}
  })

  useEffect(() => {
    const unsubscribe = db
      .users
      .doc(userId)
      .collection("friends")
      .onSnapshot((snapshot) => {
        const friendsList = snapshot.docs.map((doc) => 
        {
          const recipientSnapshot = db.users.where("username", "==", doc.data().friend).get();
          const recipientId = recipientSnapshot.docs[0].id
          // const activity = (db.users.doc(recipientId).get()).docs[0].visibility     
          const data = doc.data();
          data.id = doc.id; // Add the document ID to the data object
          // data.visibility = activity
          return data;
      });
        setFriends(friendsList);
      });
    return unsubscribe;
  }, [userId]);

  const removeFriend = async (friend) => {
    const recipientSnapshot = await db.users.where("username", "==", friend.friend).get();
    const recipientId = recipientSnapshot.docs[0].id
    const senderFriendDocId = (await db.users.doc(currentUser.uid).collection('friends').where('friend', '==', friend.friend).get()).docs[0].id;
    const recipientFriendDocId = (await db.users.doc(recipientId).collection('friends').where('friend', '==', senderUsername).get()).docs[0].id;
    db.users.doc(currentUser.uid).collection('friends').doc(senderFriendDocId).delete();
    db.users.doc(recipientId).collection('friends').doc(recipientFriendDocId).delete();
    setFriendMessage("Friend Removed.")
  };

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend}>{friend.friend}
           <button type='button' onClick={() => removeFriend(friend)} class="btn btn-primary my-6 w-10 duration-200 bg-slate-500 hover:bg-slate-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">-</button>
           </li>
          
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;


