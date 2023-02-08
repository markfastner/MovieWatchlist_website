import React from 'react';
import Navbar from './components/navigation/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={LandingPage} />
      </Routes>
    </Router>
    </>
  );
}

export default App;