// Importing necessary libraries and components
import React, { useRef, useState } from "react"; 
import { Form, Button, Card, Alert } from "react-bootstrap"; 
import { useAuth } from "../contexts/AuthContext"; 
import { db, auth} from "../../../firebase"; 
import { Link, useNavigate } from "react-router-dom"; 
import emailjs from 'emailjs-com'; 
import "firebase/firestore"; 


// import { DarkModeSwitch } from "react-toggle-dark-mode"


//Export function to sign users up
export default function SignUp() {
    
    // Creating references to form fields
const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()
const formRef = useRef();

// Destructuring variables from useAuth hook and initializing state variables
const {signup, signin}  = useAuth()
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)
const navigation = useNavigate()

// Email sending function using emailjs
const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm('service_b0jkzjv', 'template_5vb42pf', formRef.current, 'NaDh7LvjYW0WKJJaU')
      .then((result) => {
          console.log(result.text);
          console.log("message sent")
          e.target.reset() // this resets the forms 
      }, (error) => {
          console.log(error.text);
          console.log("unable to send message")
          e.target.reset() // this resets the forms 
      });
    }

// Submission handler
async function handleSubmit(e) {
    e.preventDefault()
    
    // Checking if passwords match
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
    }
    
    try {
        // Setting state and calling sign up and sign in functions
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        await signin(emailRef.current.value, passwordRef.current.value)

        // Getting the current user and setting their info in the database
        const user = auth.currentUser
        const userRef = db.users.doc(user.uid)
        sendEmail(e)
       
        userRef.set({
            email: emailRef.current.value,
            firstName: "",
            lastName: "",
            username: "",
            genre: "",
            uid: user.uid,
            profilePic: "",
            colorTheme: "light",
            signed_in: true, 
            visibility: 'Online'
        })

        // Navigating to the set-profile page
        navigation("/set-profile")
    } catch {
        setError("Failed to create an account")
    }

    setLoading(false)
}

    // return the component
    return (
    <>
        <div className="flex justify-center items-center bg-blue-200 dark:bg-slate-800 min-h-screen w-full bg-no-repeat bg-cover">
            <Card className="w-full max-w-sm p-4 bg-white border-blue-400 dark:bg-slate-700 rounded-lg shadow sm:p-6 md:p-100">
            <Card.Body className="card-body">
                <div></div>
                <h2 className="card-header flex dark:text-white text-center mb-4" style={{fontWeight:'bold'}}>Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form ref={formRef} onSubmit={handleSubmit}>
                <Form.Group id="email" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                    <Form.Label>Email Address </Form.Label>
                    <br></br>                   
                    <Form.Control 
                    className="shadow appearance-none h-10 border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    type="email" 
                    name='user_email'
                    placeholder="Enter your Email Address" 
                    ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                    <Form.Label>Password </Form.Label>
                    <br></br>
                    <Form.Control 
                    className="shadow appearance-none h-10 border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-slate-500 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password form" 
                    placeholder="Enter your password" 
                    type="password" 
                    ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm" className="block text-gray-700 dark:text-white text-sm font-bold mb-2 ">
                    <Form.Label>Password Confirmation </Form.Label>
                    <br></br>
                    <Form.Control 
                    className="shadow appearance-none h-10 border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-slate-500 leading-tight focus:outline-none focus:shadow-outline"
                    type="password" 
                    placeholder="Re-enter your password" 
                    ref={passwordConfirmRef} 
                    required />
                </Form.Group>
                <Button 
                className="btn btn-primary my-2 w-full duration-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                disabled={loading}      
                type="submit">
                    Sign Up
                </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                <Link to="/signin" className="text-blue-500 hover:underline hover:text-blue-700">Already have an account? Sign In</Link>
                </div>
            </Card.Body>
            </Card>         
        </div>
    </>
    )
}