import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default function NavBar() 
  {
    return (
      <header>
        <ul id="headerButtons">
          <Link className="navButtonDash" to='/'>Dashboard</Link>
          <Link className="navButtonProfile" to='/Profile'>Profile</Link>
          <Link className="navButtonFriends" to='/Friends'>Friends</Link>
          <Link className="navButtonWatchlists" to='/Watchlists'>Watchlists</Link>
        </ul>
      </header>
    )
  }
