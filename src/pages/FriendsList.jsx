import React, { useEffect, useState } from "react";
import { auth, db } from '../firebase.js';
import { useAuth } from "./auth/contexts/AuthContext";

const FriendsList = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [friendMessage, setFriendMessage] = useState('')
  const [senderUsername, setSenderUsername] = useState('')

  const userRef = db.users.doc(userId);
  
  
  userRef.get().then((doc) => {
    if(doc.exists) {setSenderUsername(doc.data().username)}
  })

  useEffect(() => {
    const unsubscribe = db
      .users
      .doc(userId)
      .collection("friends")
      .onSnapshot(async (snapshot) => {
        const friendsList = snapshot.docs.map(async (doc) => 
        {
          const recipientSnapshot = await db.users.where("username", "==", doc.data().friend).get();
          const recipientId = recipientSnapshot.docs[0].id
          const friendDoc = await db.users.doc(recipientId).get()
          const activityStatus = friendDoc.data().visibility
          const data = {
            ...doc.data(),
            id: doc.id, // Add the document ID to the data object
            visibility : activityStatus

          }
          return data;
      });
      const friendsData = await Promise.all(friendsList);
        setFriends(friendsData);
      });
    return unsubscribe;
  }, [userId]);

  const removeFriend = async (friend) => {
    const recipientSnapshot = await db.users.where("username", "==", friend.friend).get();
    const recipientId = recipientSnapshot.docs[0].id
    const senderFriendDocId = (await db.users.doc(userId).collection('friends').where('friend', '==', friend.friend).get()).docs[0].id;
    const recipientFriendDocId = (await db.users.doc(recipientId).collection('friends').where('friend', '==', senderUsername).get()).docs[0].id;
    db.users.doc(userId).collection('friends').doc(senderFriendDocId).delete();
    db.users.doc(recipientId).collection('friends').doc(recipientFriendDocId).delete();
    setFriendMessage("Friend Removed.")
  };

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend}>{friend.friend} {friend.visibility}
           <button type='button' onClick={() => removeFriend(friend)} class="btn btn-primary my-6 w-10 duration-200 bg-slate-500 hover:bg-slate-700 text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">-</button>
           </li>
          
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;


