import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./auth/contexts/AuthContext";
import {auth, database, db} from "../firebase"
import {Chart} from 'react-google-charts';
import FriendsList from './FriendsList';
import Watchlist2 from "../features/watchlist/Watchlist2.jsx";
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
  
  const [selectedStatus, setSelectedStatus] = useState('Online');
  const activityStatuses = ['Online', 'Idle', 'Do Not Disturb', 'Invisible'];
  
  const handleChange = (event) => {
    const newStatus = event.target.value
    setSelectedStatus(newStatus);
    db.users.doc(user.uid).update({visibility: newStatus})
  };
  const [senderUsername, setSenderUsername] = useState('')
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

    return (
      
      <div className="justify-start bg-blue-200 dark:bg-slate-800 min-h-screen">

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