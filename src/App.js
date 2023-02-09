import React from 'react';
import Navbar from './components/navigation/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import FriendsPage from './pages/FriendsPage'
import ProfilePage from './pages/ProfilePage'
import WatchListPage from './pages/WatchListPage'


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

      </Routes>
    </Router>
    </>
  );
}

export default App;