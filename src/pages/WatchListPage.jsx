import React from "react";
//import "../features/watchlist/watchlist.css";
import {useState, useEffect} from "react";
//import MovieSearch from "../features/watchlist/MovieSearch.js";
import Watchlist from "../features/watchlist/watchlist.jsx";
import AppReducer from "./auth/contexts/WatchlistReducer";
import { WatchlistProvider } from "./auth/contexts/WatchlistState";
import MostPopularMoviesList from "../features/watchlist/MostPopularMoviesList.jsx";
import MovieSearch from "../features/watchlist/MovieSearch2.jsx";
import Watchlist2 from "../features/watchlist/Watchlist2.jsx";
import "../features/watchlist/WatchlistPageStyle.css"
//c4a9a1cc
import OpenAIButton from "../features/watchlist/OpenAI.jsx";
import MovieGenreList from "../features/watchlist/MovieGenreList.jsx";
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
        
        <div>
          <OpenAIButton />
          
        </div>
        <div class = "movie-list">
          <Watchlist2 />
          
        </div>
        
        { <div class = "MovieGenreList">
          <h1>Genre Recommendation for Action Movies</h1>
          <MovieGenreList 
          genreID = {28}/>
        </div> }


        { <div class = "recommendations">
          <h1>Most Popular Movies Now!</h1>
          <MostPopularMoviesList />
        </div> }

        
        <div class = "movie-search">
          <MovieSearch />
        </div>


        

      

        
        </div>
    );
}



export default WatchlistPage;