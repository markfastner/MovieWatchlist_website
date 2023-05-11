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

  const ActiveColor = ({ selectedStatus }) => {
    const [color, setColor] = useState("bg-green-500")

    const changeColor = (color) => {
      setColor(color);
    }

    useEffect(() => {
      const run = () => {
        if (selectedStatus === "Online") changeColor("bg-green-500");
        else if (selectedStatus === "Busy") changeColor("bg-red-500");
        else if (selectedStatus === "Away") changeColor("bg-yellow-400");
        else if (selectedStatus === "Offline") changeColor("bg-gray-400");
      };

      run();
    }, [color]);

    return <div className={`w-3 h-3 rounded-full ${color}`} />;
  };

    return (
      <div className ="bg-blue-200 dark:bg-slate-800 flex relative min-h-screen gap-4">
        {/* Render the friends list */}
        <div>
          <Card className="relative w-full h-[50vh] left-8 my-8 rounded-xl shadow-md max-w-sm p-4 px-4 bg-blue-100 dark:bg-slate-600 dark:text-white sm:p-6 md:p-100">
          <p>You are currently {selectedStatus}.</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          {/* <ShowFriendsList /> */}
          <section className="bg-white dark:bg-slate-700 rounded-xl py-4 px-8">
            <div className="text-xl">Friends Activity</div>
            <ul className="friend-list">
              {friends.map((friend) => (
                <li className="flex items-center space-x-2" key={friend.id}>
                  <span>{friend.friend}</span>
                  <span>{getActivityIcon(friend.visibility)}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="absolute w-11/12 left-1/2 -translate-x-1/2 bottom-4 space-y-2">
            <div className="flex flex-row items-center justify-between bg-white w-full dark:bg-slate-700 rounded-md p-2">
              <div className='flex space-x-1.5 items-center '>
                <div className='flex items-center justify-center h-10 w-10 rounded-full bg-gray-500'>
                  <p>img</p>
                </div>
                
                <div className='flex flex-col'>
                  <p className='font-bold'>{senderUsername.length > 15 ? senderUsername.substring(0, 13) : senderUsername}</p>
                  <ActiveColor selectedStatus={selectedStatus}z />
                </div>
              </div>

              <div className="bg-gray-200 dark:bg-slate-600 px-4 py-2 rounded-md flex flex-row gap-x-2">
                <select
                  className="w-20 dark:bg-slate-500"
                  value={selectedStatus}
                  onChange={handleChange}
                >
                  {activityStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <Link to="/set-profile">
                  <Cog6ToothIcon className="w-7 h-7" />
                </Link>
              </div>
            </div>
          </div>
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
      </div>
    );
}

export default ProfilePage;