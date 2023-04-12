import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"


// Export function to sign users in
export default function ForgotPassword() {

    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    // Submission handler
    async function handleSubmit(e) {
    e.preventDefault()

    try {
        setError("")
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage("Check your inbox for steps to reset your password")
        
    } catch {
        setError("Failure: Password not reset.")
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
                <h2 className="card-header flex text-center mb-4" style={{fontWeight:'bold'}}>Reset Password</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
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
                <Link to="/signin">Sign In</Link>
                <Button 
                className="btn btn-primary my-2 w-full duration-500 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                disabled={loading}      
                type="submit">
                    Reset Password
                </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                <Link to="/signin" className="text-blue-500 hover:underline hover:text-blue-700">Sign In</Link>
                </div>
            </Card.Body>
            </Card>         
        </div>
    </>
    )
}