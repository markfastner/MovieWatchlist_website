import React, { useEffect, useState } from "react";
import {  db } from '../firebase.js';
import { FaCircle } from 'react-icons/fa';
import { IoIosMoon } from 'react-icons/io';

const FriendsList = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const [friendMessage, setFriendMessage] = useState('')
  const [senderUsername, setSenderUsername] = useState('')
  const [activityStatus, setActivityStatus] = useState('')
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        const friendsList = snapshot.docs.map(async (doc) => {
          const recipientSnapshot = await db.users.where("username", "==", doc.data().friend).get();
          const recipientId = recipientSnapshot.docs[0].id
          const friendDoc = await db.users.doc(recipientId).get()
          const friendActivityStatus = friendDoc.data().visibility;
          let newActivityStatus = friendActivityStatus;
          if (friendActivityStatus === 'Invisible' || friendActivityStatus === 'Offline') {
            newActivityStatus = 'Offline';
          }
          const data = {
            ...doc.data(),
            id: doc.id, // Add the document ID to the data object
            visibility: friendDoc.data().visibility
          }
          return data;
        });
        const friendsData = await Promise.all(friendsList);
        setFriends(friendsData);
      });
    return unsubscribe;
  }, [userId, setFriends]);
  

  useEffect(() => {
    // Listen for changes in activityStatus and update the friends list accordingly
    const friendsWithStatus = friends.map((friend) => {
      return {
        ...friend,
        activityIcon: getActivityIcon(friend.visibility),
      }
    });
    setFriends(friendsWithStatus);
  }, [activityStatus]);

  function getActivityIcon(status) {
    switch(status) {
      case 'Online':
        return <FaCircle className="text-green-500" />;
      case 'Do Not Disturb':
        return <FaCircle className="text-red-500" />;
      case 'Idle':
        return <IoIosMoon className="text-yellow-500" />;
      default:
        return <FaCircle className="text-gray-500" />;
    }
  }

  useEffect(() => {
    const filteredFriends = friends.filter((friend) => {
      const friendName = friend.friend.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return friendName.includes(searchTermLower);
    });
    setFilteredFriends(filteredFriends);
  }, [friends, searchTerm]);

  useEffect(() => {
  const unsubscribe = userRef.onSnapshot((doc) => {
    setActivityStatus(doc.data().visibility);
  });
  return unsubscribe;
}, [userRef]);

  const removeFriend = async (friend) => {
    const recipientSnapshot = await db.users.where("username", "==", friend.friend).get();
    const recipientId = recipientSnapshot.docs[0].id
    const senderFriendDocId = (await db.users.doc(userId).collection('friends').where('friend', '==', friend.friend).get()).docs[0].id;
    const recipientFriendDocId = (await db.users.doc(recipientId).collection('friends').where('friend', '==', senderUsername).get()).docs[0].id;
    db.users.doc(userId).collection('friends').doc(senderFriendDocId).delete();
    db.users.doc(recipientId).collection('friends').doc(recipientFriendDocId).delete();
    setFriendMessage("Friend Removed.")
  };

  const [showPrompt, setShowPrompt] = useState(false);
  const [friendToRemove, setFriendToRemove] = useState(null);

  function handleRemoveFriend(friend) {
    setFriendToRemove(friend);
    setShowPrompt(true);
  }

  function confirmRemoveFriend() {
    removeFriend(friendToRemove);
    setShowPrompt(false);
    setFriendToRemove(null);
  }

  function cancelRemoveFriend() {
    setShowPrompt(false);
    setFriendToRemove(null);
  }


  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>Friends List</h2>
      <div>
  <label htmlFor="searchFriends" className="sr-only">
    Search Friends
  </label>
  <div className="relative rounded-md shadow-sm">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
        className="h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M14.707 13.293a1 1 0 01-1.414 1.414l-2.023-2.023a5.5 5.5 0 111.414-1.414l2.023 2.023zM10 12a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    </div>
    <input
      type="text"
      name="searchFriends"
      id="searchFriends"
      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
      placeholder="Search friends"
      value = {searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {friends.filter((friend) => friend.friend.toLowerCase().includes(searchTerm.toLowerCase())).map((friend) => (
          <li key={friend.id} style={{ fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)', backgroundColor: '#fff' }}>
            <span>{friend.friend}</span>
            <span>{getActivityIcon(friend.visibility)}</span>
            <button
              type="button"
              onClick={() => handleRemoveFriend(friend)}
              style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {showPrompt && (
        <div style={{ background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', maxWidth: '500px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Remove Friend?</p>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>{friendToRemove && friendToRemove.friend}</p>
            <button type='button' onClick={confirmRemoveFriend} style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', fontSize: '18px', cursor: 'pointer', marginRight: '10px' }}>Yes</button>
            <button type='button' onClick={cancelRemoveFriend} style={{ background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}





  
  
  

export default FriendsList;


