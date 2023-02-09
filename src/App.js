import React from 'react';
import Navbar from './components/navigation/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'
import FriendsPage from './pages/FriendsPage'


function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/'  element={<LandingPage/>} />
        <Route path='/friends'  element={<FriendsPage/>}/>

      </Routes>
    </Router>
    </>
  );
}

export default App;