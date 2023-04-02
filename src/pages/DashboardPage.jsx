import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./auth/contexts/AuthContext";
import {auth, database, db} from "../firebase"
import {Chart} from 'react-google-charts';
import {Statistic} from 'semantic-ui-react'
// import FriendsList from './FriendsList';
import { WatchlistContext } from "./auth/contexts/WatchlistState";
// import { RenderFriendsList } from "./FriendsPage";
import { FaCircle, FaMoon } from 'react-icons/fa';
import { IoIosMoon, IoIosRadioButtonOn, IoIosRadioButtonOff } from 'react-icons/io';
// import Watchlist2 from "../features/watchlist/Watchlist2.jsx";
const API_URL = 'http://www.omdbapi.com?apikey=c4a9a1cc'




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

function DashboardPage() {
  const [error, setError] = useState("")
  const {currentUser} = useAuth()
  const user = auth.currentUser
  const userRef = db.users.doc(user.uid)
  const userId = user.uid

  const [friends, setFriends] = useState([]);
  const [friendMessage, setFriendMessage] = useState('')
  const [senderUsername, setSenderUsername] = useState('')
  const [activityStatus, setActivityStatus] = useState('')
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [friendToRemove, setFriendToRemove] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState('Online');
  const activityStatuses = ['Online', 'Idle', 'Do Not Disturb', 'Invisible'];
  
  const handleChange = (event) => {
    const newStatus = event.target.value
    setSelectedStatus(newStatus);
    db.users.doc(user.uid).update({visibility: newStatus})
  };

  
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

  
  userRef.get().then((doc) => {
      if(doc.exists) {setSenderUsername(doc.data().username)}
  })

  function BarChartPopup(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div>
            <button className="text-white" onClick={() => setIsOpen(true)}>Bar Chart</button>

            {isOpen && (
                <div className="my-6">
                    <div className="my-6">
                    <Chart
                      chartType = "BarChart"
                      data = {exampleData}
                      options = {options}
                      width={"100%"}
                      height={"400px"}
                    />
                    </div>
                    <button className = "text-white dark:text-black dark:bg-white bg-blue-500 px-2 rounded-lg" onClick={() => setIsOpen(false)}>Close</button>
                </div>
            )}
        </div>
    );
}

function BarChartGenrePopup(){
  const [isOpen, setIsOpen] = useState(false);
  return(
      <div>
          <button className="text-white" onClick={() => setIsOpen(true)}>Bar Chart</button>

          {isOpen && (
              <div className="my-6">
                  <div className="my-6">
                  <Chart
                    chartType = "BarChart"
                    data = {exampleData}
                    options = {options}
                    width={"100%"}
                    height={"400px"}
                  />
                  </div>
                  <button className = "text-white dark:text-black dark:bg-white bg-blue-500 px-2 rounded-lg" onClick={() => setIsOpen(false)}>Close</button>
              </div>
          )}
      </div>
  );
}
  const {watchlist} = useContext(WatchlistContext);

  function listOfMovies(movie){

    const titles = [];
    const genres = [];

    watchlist.forEach((movie) => {
      console.log(movie);
      
      // const currentGenre = genres.find(movie.genre_id => movie.genre_id === movie.genre_id);
      


    });
  }

  const exampleData = [
    ['Watch time', 'Hours per day'],
    ['Monday', 4],
    ['Tuesday', 5],
    ['Wednesday', 6],
    ['Thursday', 7],
    ['Friday', 8],
    ['Saturday', 9],
    ['Sunday', 10],
  ];

  const options = {
    title: "Watch time per day",
  };


  const MovieTimes ={
    
  }

  const MovieTimesOptions ={
    title: "Watch time per genre"
  }

  const MovieGenre ={

  }

  const MovieGenreOptions={
    title: "Movies per genre"
  }

  const WatchlistStats = () => (
    <div className="">
      <Card style={{width:'18rem'}} className="rounded-lg bg-green-400">
        <Statistic.Group>
          <Statistic>
            <Statistic.Value>{watchlist.length}</Statistic.Value>
            <Statistic.Label>Movies in Watchlist</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>31</Statistic.Value>
            <Statistic.Label>Pending Movies</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>22</Statistic.Value>
            <Statistic.Label>Watchlists</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Card>
      
    </div>
  )

    return (
      
      <div className="justify-start bg-blue-200 dark:bg-slate-800 min-h-screen">
        {listOfMovies()}
        <div className="max-h-screen">
          <Card className="w-full max-w-sm p-4 bg-blue-100 dark:bg-slate-600 dark:text-white shadow sm:p-6 md:p-100">
            <select value={selectedStatus} onChange={handleChange}>
          {activityStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <p>You are currently {selectedStatus}.</p>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email: </strong>{currentUser.email}
              <br></br>
              <strong>Username: </strong>{senderUsername}
              <div>
              <Link to="/set-profile">Update Profile</Link>
              </div>
            {/* <ShowFriendsList /> */}

            <ul className="friend-list">
          {friends.map((friend) => (
              <li key={friend.id}>
                <span>{friend.friend}</span>
                <span>{getActivityIcon(friend.visibility)}</span>
              
              </li>
            ))}
        </ul>
          </Card>
            
          </div>
        
          <div>
            <Card className="bg-gray-300">
              {WatchlistStats()}
            </Card>
          </div>

          <div>
            <Card className="bg-blue-800">
            <Chart
              chartType = "PieChart"
              data = {exampleData}
              options = {options}
              width={"100%"}
              height={"400px"}
            />
            <BarChartPopup />
            </Card>
          </div>
        </div>
    );
}

export default DashboardPage;