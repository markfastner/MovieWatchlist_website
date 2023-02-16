import React, {useState, useRef} from 'react';
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
  //setIsLoggedIn = currentUser ? true : false
  
  
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
