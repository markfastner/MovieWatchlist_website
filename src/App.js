import { useState } from 'react';
//import database from './firebase';
import Login from './components/Login';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
        return( // Comment out the pages you want to test
                Login() // Signup Page where users can sign up
                // LandingPage() // Landing Page where users can sign in
        )
}

export default App;