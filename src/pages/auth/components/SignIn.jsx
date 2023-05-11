// Importing necessary libraries and components
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import {auth, db} from "../../../firebase"


// Export function to sign users in
export default function SignIn() {

   // Declare variables using the useRef hook 
const emailRef = useRef()
const passwordRef = useRef()

// Get the sign-in function and the current user using the useAuth hook
const {signin} = useAuth()

// Declare variables to handle errors and loading
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)

// Use the useNavigate hook to change page
const history = useNavigate()

// Submission handler
async function handleSubmit(e) {
e.preventDefault()

try {
    // Clear any errors and set loading to true
    setError("")
    setLoading(true)

    // Sign in the user with the email and password values from the input refs
    await signin(emailRef.current.value, passwordRef.current.value)

    // Update the signed_in and visibility fields in the user's document in the database
    await db.users.doc(auth.currentUser.uid).update({signed_in: true, 
        visibility: 'Online'})        
    
    // Navigate to the dashboard page
    history("/dashboard")
} catch {
    // Set an error message if login failed
    setError(<font className="text-red-500">Failed to login: Be sure you have an account with this email and that you are entering the correct password.</font>)
}

// Set loading to false
setLoading(false)
}

     // return the component
    return (
    <>
        <div className="flex justify-center items-center bg-blue-200 dark:bg-slate-800 min-h-screen w-full bg-no-repeat bg-cover">
            <Card className="w-full max-w-sm p-4 bg-white border-blue-400 dark:bg-slate-700 rounded-lg shadow sm:p-6 md:p-100">
            <Card.Body className="card-body">
                <div></div>
                <h2 className="card-header flex text-center mb-4 dark:text-white" style={{fontWeight:'bold'}}>Sign In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="block text-gray-700 text-sm font-bold mb-2 ">
                    <Form.Label>Email Address </Form.Label>
                    <br></br>                   
                    <Form.Control 
                    className="shadow appearance-none h-10 border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline dark:border-slate-700 dark:bg-slate-500"
                    type="email" 
                    placeholder="Enter your Email Address" 
                    ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" className="block text-gray-700 text-sm font-bold mb-2">
                    <Form.Label>Password </Form.Label>
                    <br></br>
                    <Form.Control 
                    className="shadow appearance-none h-10 border rounded w-full py-2 px-3 text-gray-700 dark:text-white  leading-tight focus:outline-none focus:shadow-outline dark:border-slate-700 dark:bg-slate-500" 
                    id="password form" 
                    placeholder="Enter your password" 
                    type="password" 
                    ref={passwordRef} required />
                </Form.Group>
                <Link to="/forgot-password" className="dark:text-white">Forgot Password?</Link>
                <Button 
                className="btn btn-primary my-2 w-full duration-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                disabled={loading}      
                type="submit">
                    Sign In
                </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                <Link to="/signup" className="text-blue-500 hover:underline hover:text-blue-700">Don't have an account? Sign Up</Link>
                </div>
            </Card.Body>
            </Card>         
        </div>
    </>
    )
}