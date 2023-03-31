import React, {useState} from "react";
import { Card } from "react-bootstrap";
import { CirclePicker } from "react-color";
import { useAuth } from "./auth/contexts/AuthContext";
import {database} from "../firebase"
import { Link, useNavigate } from "react-router-dom"


// creating the profile page where there is a card to allow the user to change their profile picture and color with the edit profile button

function ProfilePage() {

  const [error, setError] = useState("")
  const {currentUser} = useAuth()
  
    return (
      <div className ="bg-blue-200 dark:bg-slate-800 flex relative min-h-screen gap-4">
        {/* Render the friends list */}
              
        <div>
          <Card className = "relative flex-col bg-white shadow-lg dark:bg-slate-700 dark:text-white rounded-md p-10 gap-1 mx-10 my-10 max-w-screen">

              {currentUser.email}
            <Link to="/set-profile">
              <button className="bg-blue-800 text-white p-2 hover:text-blue-900 hover:bg-blue-200 dark:bg-slate-400 dark:hover:bg-blue-200 dark:text-white  dark:hover:text-blue-800 duration-300 rounded-md my-8 mx-6">
              Edit Profile
              </button>
            </Link>
          </Card>
        </div>
      </div>
    );
}

export default ProfilePage;