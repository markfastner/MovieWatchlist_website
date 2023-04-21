import { useAuth } from "../../pages/auth/contexts/AuthContext";
import { db, auth } from "../../firebase";
import React, { useContext, useState, useEffect } from "react";

function ShareWithFriend({ watchlistTitle, watchlistMovies, name }) {
    const [fetchFriendslist, setFriendslist] = useState(false);
    const [friends, setfriends] = useState([]);
    const { currentUser } = useAuth();
    const userId = currentUser.uid;
    const friendslistRef = db.users.doc(userId).collection("friends");

  useEffect(() => {
    if (!fetchFriendslist) return;

    async function loadFriendslist() {
      console.log("Fetching friendslists...");
      try {
        const friendslistSnapshot = await friendslistRef.get();

        const friends = await Promise.all(
          friendslistSnapshot.docs.map(async (doc) => {
            const friend = doc.data();
            //console.log(watchlist);
            return friend;
          })
        );

        setfriends(friends);
        setFriendslist(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    }

    loadFriendslist();
  }, [fetchFriendslist]); // fetchWatchlists as a dependency

  const handleDropdownFocus = () => {
    setFriendslist(true);
    };

    const handleSelection = async (event) => {
        const selectedFriendname = event.target.value;

        //basically we want to add a watchlist to the selected friends watchlists
        //we need to get the uid of the selected friend
        const selectedFriendUID = await getUIDFromName(selectedFriendname);
        console.log("Selected friend:", selectedFriendname);
        console.log("Selected friend UID:", selectedFriendUID);

        // Check if the selected option is not the default one ("Share with friend")
        if (selectedFriendname !== "Share with friend") {
            try {
                // Get a reference to the selected friend's watchlists collection
                const friendWatchlistsRef = db.users.doc(selectedFriendUID).collection("watchlists");

                // Add the watchlist to the selected friend's watchlists
                await friendWatchlistsRef.doc(watchlistTitle).set({ title: watchlistTitle, movies: watchlistMovies });
                //await friendWatchlistsRef.add({ title: watchlistTitle , movies: watchlistMovies});

                console.log(`Watchlist "${watchlistTitle}" has been shared with "${selectedFriendname}".`);
            } catch (error) {
                console.error("Error sharing watchlist:", error);
            }
        }   
    };

    return (
        <div className="ShareWithFriend">
          <select
            style={{
              backgroundColor: 'lightblue',
              border: '1px solid #ccc',
              borderRadius: '5px',
              padding: '8px 12px',
              fontSize: '16px',
              outline: 'none',
              appearance: 'none',
              cursor: 'pointer',
            }}
            onFocus={handleDropdownFocus}
            onChange={handleSelection}
          >
            <option selected>Share with friend</option>
            {friends.map((friend) => (
              <option>{friend.friend}</option>
            ))}
            <option>friend 1</option>
          </select>
        </div>
      );
      
}

    async function getUIDFromName(name) {
    const userRef = db.users.where("username", "==", name);
    const querySnapshot = await userRef.get();
    if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id;
    } else {
        console.log("No such document!");
    }
    }   

export default ShareWithFriend;
