import React from "react";
//import "../features/watchlist/watchlist.css";
import {useState, useEffect} from "react";
//import MovieSearch from "../features/watchlist/MovieSearch.js";
import Watchlist from "../features/watchlist/watchlist.jsx";
import AppReducer from "./auth/contexts/WatchlistReducer";
import { WatchlistProvider } from "./auth/contexts/WatchlistState";
import Recommendations from "../features/watchlist/Recommendations.jsx";
import MovieSearch from "../features/watchlist/MovieSearch2.jsx";
import Watchlist2 from "../features/watchlist/Watchlist2.jsx";
import "../features/watchlist/WatchlistPageStyle.css"
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
        
        <div class = "movie-list">
          <Watchlist2 />
          
        </div>
        

        { <div clas = "recommendations">
          <h1>Recommendations</h1>
          <Recommendations />
        </div> }

        
        <div class = "movie-search">
          <MovieSearch />
        </div>


        

      

        
        </div>
    );
}



export default WatchlistPage;