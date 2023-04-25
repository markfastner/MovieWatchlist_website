import React, { useEffect, useState } from "react";
import { useAuth } from "../../pages/auth/contexts/AuthContext";
import { db } from "../../firebase";
import Watchlist2 from "./Watchlist2";
import { getUIDFromName } from "./ShareWithFriendButton";

function FriendsWatchingList() {
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  const [friends, setFriends] = useState([]);
  const friendsListRef = db.users.doc(userId).collection("friends");
  const [showFriendsWatchList, setShowFriendsWatchList] = useState(false);
  // Retrieve the list of friends from the database

  async function loadFriends(){
    const friendsSnapshot = await friendsListRef.get();
    const friends = await Promise.all(
      friendsSnapshot.docs.map(async (doc) => {
        const friend = await getUserFromUsername(doc.data().friend);
        return friend;
      })
    );
    setFriends(friends);
    console.log(friends);
  }

  async function handleShowFriendsWatchList() {
    setShowFriendsWatchList(true);
    //load friends list
    await loadFriends();
  }

  function handleHideFriendsWatchList() {
    setShowFriendsWatchList(false);
  }


  return (
    <div>
      <h1>Friends Watchlists</h1>
      {!showFriendsWatchList && (
        <button onClick = {handleShowFriendsWatchList} style={{backgroundColor: "#FFD700", border: "none", color: "white", padding: "8px 16px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", borderRadius: "50px", cursor: "pointer", transition: "background-color 0.3s ease"}}>see what your friends are watching</button>
      )}
      {showFriendsWatchList && (
        <div>
          <button onClick = {handleHideFriendsWatchList} style={{backgroundColor: "#FFD700", border: "none", color: "white", padding: "8px 16px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", borderRadius: "50px", cursor: "pointer", transition: "background-color 0.3s ease"}}>hide what your friends are watching</button>
          <div>
            {friends.map((friend) => (
              <div>
                {console.log("friend uid: " + friend.uid)}
                <Watchlist2 
                userId = {friend.uid}
                isFriend = {true}
                />
              </div>
            ))}
          </div>
        </div>
      )}


      
    </div>
  );
}

async function getUserFromUsername(username) {
  const userSnapshot = await db.users
    .where("username", "==", username)
    .get();
  const user = userSnapshot.docs[0].data();
  return user;
}

export default FriendsWatchingList;
