import React, {useState, useEffect} from 'react';
import { Button } from '../Button.js';
import { Link } from 'react-router-dom';
import './Navbar.css';
import '../../App.css'

const NavBarLinks = ["Dashboard","Watchlist", "Ratings", "Friends", "Profile"]

export const Navbar=()=>{
  return(<nav className="flex justify-between px-8 py-4 bg-blue-900">
    <div>
      <Link to='/' className="text-white tracking-wide">
        RT <i className="fa-thin fa-camera-movie text-white" />
      </Link>
    </div>
    <div className="flex justify-center items-center space-x-8">
    <ul className="flex items-center justify-end space-x-4">
      {
        NavBarLinks.map(link => {
          return <li>
            <Link to={`/${link}`} className="text-white tracking-wider">{link}</Link>
          </li>
        })
      }
    </ul>
    <div className="space-x-2">
      <button className="px-4 py-0.5 bg-white hover:bg-blue-200 rounded duration-500 ">
        Sign In
      </button>
      <button className="px-4 py-0.5 bg-white hover:bg-blue-200 rounded duration-500">
        Sign Up
      </button>
    </div>
    </div>
  </nav>
  );

}

export default Navbar;
