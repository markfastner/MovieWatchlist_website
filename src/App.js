import React from 'react';
import Navbar from './components/navigation/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import FriendsPage from './pages/FriendsPage'
import ProfilePage from './pages/ProfilePage'
import WatchListPage from './pages/WatchListPage'
import SignInPage from './pages/auth/components/SignIn'
import SignUpPage from './pages/auth/components/SignUp'
function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/'  element={<LandingPage/>} />
        <Route path='/friends'  element={<FriendsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/watchlist' element={<WatchListPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;