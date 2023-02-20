import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { db, auth} from "../../../firebase"
import { Link, useNavigate } from "react-router-dom"
import "firebase/firestore"

//Export function to sign users up
export default function SignUp() {
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    
    const {signup, currentUser}  = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    
    // Submission handler
    async function handleSubmit(e) {
        e.preventDefault()
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            const user = auth.currentUser
            const userRef = db.users.doc(user.uid)
        userRef.set({
            email: emailRef.current.value,
            firstName: "",
            lastName: "",
            username: "",
            genre: "",
            uid: ""
        })
        navigation("/set-profile")
    } catch {
        setError("Failed to create an account")
    }

    setLoading(false)
    }

    // return the component
    return (
    <>
        <div className="flex justify-center items-center bg-blue-200 min-h-screen w-full bg-no-repeat bg-cover">
            <Card className="w-full max-w-sm p-4 bg-white border-blue-400 rounded-lg shadow sm:p-6 md:p-100">
            <Card.Body className="card-body">
                <div></div>
                <h2 className="card-header flex text-center mb-4" style={{fontWeight:'bold'}}>Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="block text-gray-700 text-sm font-bold mb-2">
                    <Form.Label>Email Address </Form.Label>
                    <br></br>                   
                    <Form.Control 
                    className="shadow appearance-none h-10 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email" 
                    placeholder="Enter your Email Address" 
                    ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" className="block text-gray-700 text-sm font-bold mb-2">
                    <Form.Label>Password </Form.Label>
                    <br></br>
                    <Form.Control 
                    className="shadow appearance-none h-10 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password form" 
                    placeholder="Enter your password" 
                    type="password" 
                    ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm" className="block text-gray-700 text-sm font-bold mb-2 ">
                    <Form.Label>Password Confirmation </Form.Label>
                    <br></br>
                    <Form.Control 
                    className="shadow appearance-none h-10 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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