import React, {useState, useRef, useEffect} from 'react';
import LoginButtons from './Button.js';
import { Link } from 'react-router-dom';
import './Navbar.css';
import '../../App.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/auth/contexts/AuthContext.js';


export const Navbar=()=>{
  // The Navigation bar which links to each component's url extension
  const NavBarLinks = ["Dashboard","Watchlist", "Ratings", "Friends"]
  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {signin, currentUser, signout} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // const {signout} = useAuth()

  // logged in status
  const [loggedIn, setLoggedIn] = useState(true)
  
  // check for inactivity and log out
  const checkForInactivity = () => {

    // Get expiretime from local storage
    const expireTime = localStorage.getItem('expireTime')

    // if no user, keep expiretime at 0
    if(!currentUser) {
      updateExpireTime()
      setIsLoggedIn(false)
    }

    // If expire time is earlier than current time, log out
    if (expireTime < Date.now() && currentUser) {
      signout()
      setLoggedIn(false)
    }
  }

  // function to update expire time
  const updateExpireTime = () => {
    
    // set expire time to 10 seconds of inactivity, from current time
    const timer = Date.now() + 10000

    // set expire time in local storage
    localStorage.setItem('expireTime', timer)
  }

  // use effect to set interval to check for inactivity
  useEffect(() => {

  
    // check for inactivity every 1 seconds
    const interval = setInterval(() => {
      checkForInactivity()
    }, 1000) 

    // clear interval on unmount
    return () => clearInterval(interval)
  }, [])

  // reset expire time on user activity
  useEffect(() => {
    
    // set initial expire time
    updateExpireTime()

    // add event listeners to reset inactivity timer
    window.addEventListener("click", updateExpireTime)
    window.addEventListener("keypress", updateExpireTime)
    window.addEventListener("scroll", updateExpireTime)
    window.addEventListener("mousemove", updateExpireTime)

    // event listeners must be removed to add new ones
    window.removeEventListener("click", updateExpireTime)
    window.removeEventListener("keypress", updateExpireTime)
    window.removeEventListener("scroll", updateExpireTime)
    window.removeEventListener("mousemove", updateExpireTime)
  }, [])
  

  // logs the user out
  async function handleLogout(){
    setError('')
    try {
      await signout()
      setIsLoggedIn = false
      navigate('/')
    } catch {
      setError = 'Logout not executed.'
    }
  }


  return(<nav className="flex justify-between px-8 py-4 bg-blue-900">
    <div >
      <Link to='/' className="text-white tracking-wide px-8 py-4">
        Runtime <i className="fa-thin fa-camera-movie text-white" />
      </Link>
    </div>
    <div className="flex justify-center items-center space-x-8">
    <ul className="flex items-center justify-end space-x-4">
      {!currentUser ? (
        <button onClick={() => navigate('/signup', { replace: true })} className="px-4 py-0.5 bg-white hover:bg-blue-200 rounded duration-500 ">Sign Up</button>
      ): 
    <ul className="flex items-center justify-end space-x-4">
      {
        NavBarLinks.map(link => {
          return <li>
            <Link to={`/${link}`} className="text-white tracking-wider">{link}</Link>
          </li>
        })
      }
    </ul>}
    </ul>
    <ul className="flex items-center justify-end space-x-4">
            {currentUser ? (
            <button onClick={handleLogout} className="px-4 py-0.5 bg-white hover:bg-blue-200 rounded duration-500 ">Log Out</button>
          ) : (
            <a href="/signin" className="px-4 py-0.5 bg-white hover:bg-blue-200 rounded duration-500 ">Sign In</a>
          )}
    </ul>
    </div>

  </nav>
  );

}

export default Navbar;
