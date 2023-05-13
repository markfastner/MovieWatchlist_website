/**
 * {
  "name": "runtime",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emailjs/browser": "^3.10.0",
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@headlessui/react": "^1.7.12",
    "@heroicons/react": "^2.0.14",
    "@mui/material": "^5.11.15",
    "@mui/styled-engine-sc": "^5.11.9",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "crypto-browserify": "^3.12.0",
    "dns": "^0.2.2",
    "emailjs-com": "^3.2.0",
    "firebase": "^9.18.0",
    "framer-motion": "^10.0.1",
    "fs": "^0.0.1-security",
    "headlessui": "^0.0.0",
    "i18next": "^22.4.15",
    "i18next-browser-languagedetector": "^7.0.1",
    "i18next-http-backend": "^2.2.0",
    "nodemailer": "^6.9.1",
    "openai": "^3.2.1",
    "path": "^0.12.7",
    "react": "^18.2.0",
    "react-bootstrap": "^2.7.0",
    "react-color": "^2.19.3",
    "react-dom": "^18.2.0",
    "react-firebase-hooks": "^3.0.4",
    "react-google-charts": "^4.0.0",
    "react-i18next": "^12.2.1",
    "react-icons": "^4.8.0",
    "react-router": "^6.8.0",
    "react-router-dom": "^6.8.0",
    "react-scripts": "^5.0.1",
    "react-toggle-dark-mode": "^1.1.1",
    "semantic-ui-react": "^2.1.4",
    "stream-browserify": "^3.0.0",
    "styled-components": "^5.3.6",
    "url": "^0.11.0",
    "uuid": "^9.0.0",
    "web-vitals": "^2.1.4",
    "webfontloader": "^1.6.28"
  },
  "scripts": {
    "start": "react-scripts start",
    "serve": "webpack serve --mode development",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "autoprefixer": "^10.4.13",
    "html-webpack-plugin": "^5.5.0",
    "postcss": "^8.4.19",
    "tailwindcss": "^3.2.7",
    "webpack-cli": "^5.0.1"
  }
}
 */
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

import DarkMode from "./features/profile/components/darkMode";
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
  const[colorTheme, setTheme] = DarkMode();

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
