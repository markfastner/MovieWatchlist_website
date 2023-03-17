import React, { useEffect, useState } from "react";
import { db } from '../firebase.js';

const FriendsList = ({ userId }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .users
      .doc(userId)
      .collection("friends")
      .onSnapshot((snapshot) => {
        const friendsList = snapshot.docs.map((doc) => doc.data().friend);
        setFriends(friendsList);
      });
    return unsubscribe;
  }, [userId]);

  return (
    <div>
      <h2>Friends List</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;


