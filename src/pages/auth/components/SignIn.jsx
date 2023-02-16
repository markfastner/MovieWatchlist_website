import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import {db} from "../../../firebase"


// Export function to sign users in
export default function SignIn() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const nameRef = useRef()
    const {signin, currentUser} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useNavigate()

    // Submission handler
    async function handleSubmit(e) {
    e.preventDefault()

    try {
        db.users.add({
            name: emailRef.current.value,

        })
        setError("")
        setLoading(true)
        await signin(emailRef.current.value, passwordRef.current.value)
        
        history("/dashboard")
    } catch {
        setError("Failed to login: Be sure you have an account with this email, and that you are entering the correct password.")
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
                <h2 className="card-header flex text-center mb-4" style={{fontWeight:'bold'}}>Sign In</h2>
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
                <Link to="/forgot-password">Forgot Password?</Link>
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