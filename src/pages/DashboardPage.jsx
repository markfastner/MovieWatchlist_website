import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./auth/contexts/AuthContext";
import {database} from "../firebase"


// Displaying the dashboard page
// Dashboard page currently has the activity status card
function DashboardPage() {
  const [error, setError] = useState("")
  const {currentUser, signout} = useAuth()
  const navigate = useNavigate()
  
  async function handleLogout(){
    setError('')
    try {
      await signout()
      navigate('/')
    } catch {
      setError = 'Logout not executed.'
    }
  }


    return (
      <div className="flex justify-start bg-blue-200 min-h-screen">
        <Card className="w-full max-w-sm p-4 bg-blue-100 border-blue-400 shadow sm:p-6 md:p-100">
          <Card.Body>
            <h2 className="text-center mb-4 text-black">Activity status</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <strong>Email: </strong>{currentUser.email}
            <div>
            <Link to="/set-profile">Update Profile</Link>

            </div>
          </Card.Body>
        </Card>
        <Button variant="link" onClick={handleLogout}>Log Out</Button>
      </div>
    );
}

export default DashboardPage;