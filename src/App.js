import React, { useEffect, useState } from 'react';
import Navbar from './components/navigation/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import RatingsPage from './pages/RatingsPage'
import RatingsPageJake from './pages/RatingsPageJake.jsx'
import DashboardPage from './pages/DashboardPage'
import FriendsPage from './pages/FriendsPage'
import ProfilePage from './pages/ProfilePage'
import WatchListPage from './pages/WatchListPage'
import SignIn from './pages/auth/components/SignIn'
import SignUp from './pages/auth/components/SignUp';

import {AuthProvider, useAuth} from './pages/auth/contexts/AuthContext.js';
import {auth, db} from './firebase'

// import DarkMode from "./features/profile/components/darkMode";
import PrivateRoute from './pages/auth/components/PrivateRoute';
import SetProfile from './pages/auth/components/SetProfile';
import ForgotPassword from './pages/auth/components/ForgotPassword';
import Footer from './components/navigation/Footer';
import Support from './pages/SupportPage';
import TermsAndConditions from './pages/TermsAndConditionsPage';
import About from './pages/AboutMePage';
import Contact from './pages/ContactPage';
import { WatchlistProvider } from "./pages/auth/contexts/WatchlistState";

import DiscoverMoviesPage from './pages/DiscoverMoviesPage';

import { ChatContextProvider } from './pages/auth/contexts/ChatContext.js';

import {useTranslation} from 'react-i18next';

const languages = [
  {value: '', text: "Options"},
  {value: 'en', text: "English"},
  {value: 'zh', text: "Chinese"},
  {value: 'de', text: "German"},
  {value: 'ja', text: "Japanese"},
  {value: 'ko', text: "Korean"},
  {value: 'es', text: "Spanish"},
  {value: 'tl', text: "Tagalog"}
]



// App component which runs the whole application
function App() {
  const [error, setError] = useState("")
  const {currentUser} = useAuth() || {}
  
  // Logs the user out
  async function handleLogout(){
    setError('logged out')
    try {
      await db.users.doc(auth.currentUser.uid).update({signed_in: false, 
        visibility: 'Offline'})
      await auth.signOut()
    } catch {
      setError('Logout not executed.')
    }
  }

  // Dark mode/ light mode
  // const[colorTheme, setTheme] = DarkMode();

  // Logged in status
  // const [loggedIn, setLoggedIn] = useState(true)
  
  // Check for inactivity and log out
  const checkForInactivity = () => {

    // Get expiretime from local storage
    const expireTime = localStorage.getItem('expireTime')

    // Get idletime from local storage
    const idleTime = localStorage.getItem('idleTime')

    // If no user, keep expiretime at 0
    if(!currentUser) {
      updateExpireTime()
      // setLoggedIn(false)
    }

    // If expire time is earlier than current time, log out
    if (expireTime < Date.now()) { //  && loggedIn
      // setLoggedIn(false)
      handleLogout()
    }
    else if (idleTime < Date.now()) {
      db.users.doc(auth.currentUser.uid).update({visibility: 'Idle'})
    }
  }

  // Function to update expire time
  const updateExpireTime = () => {
    
    // Set expire time to 30 minutes of inactivity from current time
    const expireTime = Date.now() + 1800000

    // Set idle time to 90 seconds of inactivity from current time
    const idleTime = Date.now() + 90000

    // Set expire time in local storage
    localStorage.setItem('expireTime', expireTime)

    // Set idle time in local storage
    localStorage.setItem('idleTime', idleTime)
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

    // clean up
    return() => {
      
      // event listeners must be removed to add new ones
      window.removeEventListener("click", updateExpireTime)
      window.removeEventListener("keypress", updateExpireTime)
      window.removeEventListener("scroll", updateExpireTime)
      window.removeEventListener("mousemove", updateExpireTime)
    }
  },  [])
  

  // Returns the app component which handles the routing of the application
  return (
    <>
    {error}
        <Router>
          <AuthProvider> 
          <WatchlistProvider>
            <ChatContextProvider>
          <Navbar/>
          <Routes>
            <Route exact path='/'  element={<LandingPage/>} />
            <Route path='/friends'  element={<PrivateRoute><FriendsPage/></PrivateRoute>}/>
            <Route path='/profile' element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
            <Route path='/watchlist' element={<PrivateRoute><WatchListPage/></PrivateRoute>}/>
            <Route path='/discover Movies' element={<PrivateRoute><DiscoverMoviesPage/></PrivateRoute>}/>
            <Route path='/dashboard' element={<PrivateRoute><DashboardPage/></PrivateRoute>}/>
            <Route path='/ratings' element={<PrivateRoute><RatingsPage/></PrivateRoute>}/>
            <Route path='/support' element={<Support/>}/>
            <Route path='/terms and conditions' element={<TermsAndConditions/>}/>
            <Route path='/about' element={<About/>}/>
            {/* <Route path='/contact us' element={<Contact/>}/> */}
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/set-profile' element={<PrivateRoute><SetProfile/></PrivateRoute>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
          </Routes>
            </ChatContextProvider>
          </WatchlistProvider>
          </AuthProvider>
          <Footer/>
        </Router>
    </>      
  );
}

export default App;
