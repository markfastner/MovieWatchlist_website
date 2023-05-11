import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import '../../App.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../pages/auth/contexts/AuthContext.js';
import { auth, db } from "../../firebase"


export const Navbar=()=>{

  const {currentUser, signout} = useAuth()
  const [error, setError] = useState("")


  // The Navigation bar which links to each component's url extension
  const NavBarLinks = ["Dashboard", "Discover Movies", "Watchlist", "Ratings", "Friends"]
  const navigate = useNavigate()


  // Logs the user out
  async function handleLogout(){
    setError('')
    try {
      await db.users.doc(auth.currentUser.uid).update({signed_in: false, 
        visibility: 'Offline'})
      await signout()
      navigate('/')
    } catch {
      setError('Logout not executed.')
    }
  }

  return(<nav className="flex justify-between px-8 py-4 bg-white dark:bg-slate-900">
    <div >
      <Link to='/' className="text-blue-900 dark:text-white tracking-wide px-8 py-4">
        Runtime <i className="fa-thin fa-camera-movie text-white" />
      </Link>
    </div>
    {error}
    <div className="flex justify-center items-center space-x-8">
    <ul className="flex items-center justify-end space-x-4">
      {!currentUser ? (
        <button onClick={() => navigate('/signup', { replace: true })} className="px-4 py-0.5 bg-blue-900 text-white dark:bg-white hover:bg-blue-200 rounded duration-500 dark:text-black">Sign Up</button>
      ): 
    <ul className="flex items-center justify-end space-x-4">
      {
        NavBarLinks.map(link => {
          return <li>
            <Link to={`/${link}`} className="text-blue-900 dark:text-white tracking-wider hover:underline hover:text-blue-400">{link}</Link>
          </li>
        })
      }
    </ul>}
    </ul>
    
    <ul className="flex items-center justify-end space-x-4">
            {currentUser ? (
            <button onClick={handleLogout} className="px-4 py-0.5 bg-blue-900 text-white dark:bg-white dark:text-blue-900 hover:bg-blue-200 rounded duration-500 dark:duration-500 dark:hover:bg-blue-200">Log Out</button>
          ) : (
            <a href="/signin" className="px-4 py-0.5 bg-blue-900 dark:bg-white text-white hover:bg-blue-200 rounded duration-500 dark:text-black">Sign In</a>
          )}
    </ul>
    </div>

  </nav>
  );

}

export default Navbar;
