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

import { useTranslation } from "react-i18next";
// import Watchlist2 from "../features/watchlist/Watchlist2.jsx";
const API_URL = "http://www.omdbapi.com?apikey=c4a9a1cc";



// Displaying the dashboard page
// Dashboard page currently has the activity status card

// function ShowFriendsList() {
//   const { currentUser } = useAuth();
//   const userId = currentUser.uid;
//   return (
//       <div className="flex items-center">
//         <FriendsList userId={userId} />

//       </div>
//     );
// }

// adding functionality to have the friend's list and the activity status in
function DashboardPage() {
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

  const {t} = useTranslation();

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

  // function to open up the barchart
  function BarChartPopup() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div classname="rounded-xl">
        <button className="text-black" onClick={() => setIsOpen(true)}>
          Bar Chart
        </button>

        {isOpen && (
          <div className="my-6">
            <div className="my-6">
              <Chart
                chartType="BarChart"
                data={exampleData}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </div>
            <button
              className="text-white dark:text-black dark:bg-white bg-blue-500 px-4 rounded-lg py-2 relative left-4 bottom-4"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }

  // function for the genre bar chart
  function BarChartGenrePopup() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <button className="text-white dark:text-white" onClick={() => setIsOpen(true)}>
          Bar Chart
        </button>

        {isOpen && (
          <div className="my-6 dark:bg-slate-700">
            <div className="my-6">
              <Chart
                chartType="BarChart"
                data={exampleData}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </div>
            <button
              className="text-white dark:text-black dark:bg-blue-500 bg-blue-500 px-2 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
  const { watchlist } = useContext(WatchlistContext);

  // function that loops through the movies in your watchlist
  function listOfMovies(movie) {
    const titles = [];
    const genres = [];

    watchlist.forEach((movie) => {
      console.log(movie);

      // const currentGenre = genres.find(movie.genre_id => movie.genre_id === movie.genre_id);
    });
  }

  const exampleData = [
    ["Watch time", "Hours per day"],
    ["Monday", 4],
    ["Tuesday", 5],
    ["Wednesday", 6],
    ["Thursday", 7],
    ["Friday", 8],
    ["Saturday", 9],
    ["Sunday", 10],
  ];

  const options = {
    title: "Watch time per day",
  };

  const MovieTimes = {};

  const MovieTimesOptions = {
    title: "Watch time per genre",
  };

  const MovieGenre = {};

  const MovieGenreOptions = {
    title: "Movies per genre",
  };

  // Key performance indicators for the watchlist
  const WatchlistStats = () => {
    return (
      <div className="flex flex-col space-y-2 w-full rounded-lg bg-blue-100 px-4 py-2 dark:text-white dark:bg-slate-600 overflow-x-hidden">
        <label className="text-xl">
          Completed Movies: <span>40</span> movies
        </label>
        <label className="text-xl">
          Movies to Watch: <span>{watchlist.length}</span> movies
        </label>
      </div>
    );
  };

  // changing the active status of the user

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

  

  // styling all of the components
  return (
    <div className="flex relative min-h-screen bg-blue-200 dark:bg-slate-800 w-full">
      {/* {listOfMovies()} */}
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

      <div className="flex-col flex relative left-16 w-3/4 my-8 overflow-x-hidden rounded-xl">
        <div>
          <WatchlistStats />
        </div>

        <div>
          <Card className="bg-white">
            <Chart
              chartType="PieChart"
              data={exampleData}
              options={options}
              width={"100%"}
              height={"400px"}
              className = "dark:bg-slate-700"
            />
            <BarChartPopup />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
