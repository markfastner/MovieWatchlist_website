import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
//import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function SignUp() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  //const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
     // await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card className="card">
        <Card.Body className="card-body">
          <h2 className="card-header" style={{fontWeight:'bold'}}>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name-reg" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}} class="form-control">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/signin">Sign In</Link>
      </div>
    </>
  )
}


// import React from 'react'

// export default function SignUp(){
//     return(
//         <div>
//             <div class="container">
//         <div class="card">            
//             <div class="card-header" style={{fontWeight:'bold'}}>Sign Up</div>    
//             <div class="card-body">
//                 <form action="/auth/register" method="POST">
                    
//                         <label for="name-reg" class="form-label">Name</label>
//                         <br></br>
//                         <input type="text" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}} class="form-control" id="name-reg" name="name"/>                        
                    
//                         <br></br>
//                         <label for="email-reg" class="form-label">Email</label>
//                         <br></br>
//                         <input type="text" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}} class="form-control" id="email-reg" name="email"/>                        
//                         <br></br>
//                         <label for="password-reg" class="form-label">Password</label>
//                         <br></br>
//                         <input type="password" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}}  class="form-control" id="password-reg" name="password"/>
//                         <br></br>
//                         <label for="password-conf-reg" class="form-label">Confirm Password</label>
//                         <br></br>
//                         <input type="password" style={{border: '3px solid rgba(0, 0, 0, 0.7)'}} class="form-control" id="password-conf-reg" name="password-confirm"/>
//                     <br></br>
//                     <button type="submit" style={{background: 'black', color : 'white'}} class="btn btn-primary">Submit</button>
//                     <br></br>
//                     <a href='/signin'>Already have an account? Sign In.</a>
//                 </form>
//             </div>
//         </div>
//     </div>
//         </div>
//     )
// }