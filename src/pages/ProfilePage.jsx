import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, database, db } from "../firebase";
import { Chart } from "react-google-charts";
// import FriendsList from './FriendsList';
import { WatchlistContext } from "./auth/contexts/WatchlistState";
// import { RenderFriendsList } from "./FriendsPage";
import { FaCircle, FaMoon } from "react-icons/fa";
import {
  IoIosMoon,
  IoIosRadioButtonOn,
  IoIosRadioButtonOff,
} from "react-icons/io";

import { Cog6ToothIcon } from "@heroicons/react/24/solid";

// creating the profile page where there is a card to allow the user to change their profile picture and color with the edit profile button

function ProfilePage() {
  function userProperties(currentUser) {
    console.log(currentUser);
  };

  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const user = auth.currentUser;
  const userRef = db.users.doc(user.uid);
  const userId = user.uid;

  const [friends, setFriends] = useState([]);
  const [friendMessage, setFriendMessage] = useState("");
  const [senderUsername, setSenderUsername] = useState("");
  const [activityStatus, setActivityStatus] = useState("");
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [friendToRemove, setFriendToRemove] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState("Online");
  const activityStatuses = ["Online", "Away", "Busy", "Offline"];

  const handleChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    db.users.doc(user.uid).update({ visibility: newStatus });
  };

  userRef.get().then((doc) => {
    if (doc.exists) {
      setSenderUsername(doc.data().username);
    }
  });

  useEffect(() => {
    const unsubscribe = db.users
      .doc(userId)
      .collection("friends")
      .onSnapshot(async (snapshot) => {
        const friendsList = snapshot.docs.map(async (doc) => {
          const recipientSnapshot = await db.users
            .where("username", "==", doc.data().friend)
            .get();
          const recipientId = recipientSnapshot.docs[0].id;
          const friendDoc = await db.users.doc(recipientId).get();
          const friendActivityStatus = friendDoc.data().visibility;
          let newActivityStatus = friendActivityStatus;
          if (
            friendActivityStatus === "Invisible" ||
            friendActivityStatus === "Offline"
          ) {
            newActivityStatus = "Offline";
          }
          const data = {
            ...doc.data(),
            id: doc.id, // Add the document ID to the data object
            visibility: friendDoc.data().visibility,
          };
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
      };
    });
    setFriends(friendsWithStatus);
  }, [activityStatus]);

  // function for the activity status for the friends list
  function getActivityIcon(status) {
    switch (status) {
      case "Online":
        return <FaCircle className="text-green-500" />;
      case "Busy":
        return <FaCircle className="text-red-500" />;
      case "Away":
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

  userRef.get().then((doc) => {
    if (doc.exists) {
      setSenderUsername(doc.data().username);
    }
  });


    return (
      <div className ="bg-blue-200 dark:bg-slate-800 flex relative min-h-screen gap-4">
        {/* Render the friends list */}
        <div>
          <Card className = "relative flex-col bg-white shadow-lg dark:bg-slate-700 dark:text-white rounded-md p-10 gap-1 mx-10 my-10 max-w-screen">
                <div className = "">
                    <button>
                        <img src="" className="w-32 h-32 rounded-full object-cover mx-auto bg-gray-600"/>
                    </button>
                    
                </div>
              {currentUser.email}
              {userProperties(currentUser)}
            <Link to="/set-profile">
              <button className="bg-blue-800 text-white p-2 hover:text-blue-900 hover:bg-blue-200 dark:bg-slate-400 dark:hover:bg-blue-200 dark:text-white  dark:hover:text-blue-800 duration-300 rounded-md my-8 mx-6">
              Edit Profile
              </button>
            </Link>
          </Card>
        </div>

        <div>
          <Card className="bg-white shadow-lg dark:bg-slate-700 dark:text-white rounded-md p-5 gap-1 mx-10 my-10 max-w-screen">
            Biography
            <form action="/action_page.php">
              <textarea rows="100" cols="100" className="resize-full max-w-full w-full h-32 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-800 dark:bg-slate-700 dark:text-white dark:border-slate-400" placeholder="Enter your biography here..."></textarea>
            </form>
          </Card>

          <Card className="bg-white shadow-lg dark:bg-slate-700 dark:text-white rounded-md p-5 gap-1 mx-10 my-10 max-w-screen">
            Status 
            <form action="/action_page.php">
              <textarea rows="100" cols="100" className="resize-full max-w-full w-full h-32 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-800 dark:bg-slate-700 dark:text-white dark:border-slate-400" placeholder="Update your status here..."></textarea>
            </form>
          </Card>
        </div>
        <div>
          <Card className="bg-white shadow-lg dark:bg-slate-700 dark:text-white rounded-md p-5 gap-1 mx-10 my-10 max-w-screen">
            Friend's List
          </Card>
        </div>
        
      </div>
    );
}

export default ProfilePage;