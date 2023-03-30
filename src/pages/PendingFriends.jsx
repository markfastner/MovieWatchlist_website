import React, { useEffect, useState } from "react";
import { db } from '../firebase.js';

const PendingFriends = ({ userId }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .users
      .doc(userId)
      .collection("pending-friends")
      .onSnapshot((snapshot) => {
        const friendsList = snapshot.docs.map((doc) => doc.data().pending);
        setFriends(friendsList);
      });
    return unsubscribe;
  }, [userId]);

  return (
    <div>
      <h2>Pending Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default PendingFriends;


