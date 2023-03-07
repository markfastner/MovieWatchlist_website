import React from "react";
//import "../features/watchlist/watchlist.css";
import {useState, useEffect} from "react";
import MovieSearch from "../features/watchlist/MovieSearch.js";
import Watchlist from "../features/watchlist/watchlist.jsx";
import AppReducer from "./auth/contexts/WatchlistReducer";
import { WatchlistProvider } from "./auth/contexts/WatchlistState";
//c4a9a1cc

const API_URL = 'http://www.omdbapi.com?apikey=c4a9a1cc'


function WatchlistPage() {
    return (
      // this will be a list of movies that the user has added to their watchlist
      // the user will be able to add movies to their watchlist from the movie details page
      // the user will be able to remove movies from their watchlist from the watchlist page
      
      // the watchlist page will be a list of movies that the user has added to their watchlist

  
      <div class="watchlist-container">
        {/* Render the friends list */}
        <h1 class="header">
        Watchlist Page
        </h1>
        
        <div class = "movie-search">
          <h2>api test</h2>
          <MovieSearch />
        </div>


        <div class = "movie-list">
          <h2>Your Watchlist</h2>
          <Watchlist />
          
        </div>

        
        </div>
    );
}



export default WatchlistPage;