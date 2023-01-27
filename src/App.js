import { useState } from 'react';
import database from './firebase';
import Login from './components/Login';
import Home from './components/Home';

function App() {
        return(
                <div>
                <Login />
                </div>
        )
}

export default App;