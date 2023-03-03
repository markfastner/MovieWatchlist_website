import React from "react";
// import "../features/watchlist/watchlist.css";
import {useState, useEffect} from "react";
import MovieSearch from "../features/watchlist/MovieSearch.js";
//c4a9a1cc

const API_URL = 'http://www.omdbapi.com?apikey=c4a9a1cc'

//add movie api spice
class Movie extends React.Component {
  name = "blank";
  year = 0;
};
//make an instance of movie
Movie.movie1 = new Movie();
Movie.movie1.name = "Titanic";
Movie.movie1.year = 2000;

//make an instance of movie
Movie.movie2 = new Movie();
Movie.movie2.name = "Star Wars";
Movie.movie2.year = 2001;

//make an instance of movie
Movie.movie3 = new Movie();
Movie.movie3.name = "The Matrix";
Movie.movie3.year = 2002;

function WatchlistPage() {
    return (
      // this will be a list of movies that the user has added to their watchlist
      // the user will be able to add movies to their watchlist from the movie details page
      // the user will be able to remove movies from their watchlist from the watchlist page
      
      // the watchlist page will be a list of movies that the user has added to their watchlist

      // create a template in js for the watchlist page
      //template includs a header, a list of movies, and a search bar to add movies
      //each components has been put into a div for styling
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
          <div class = "movie-item"> 
            <h3>name = {Movie.movie1.name} year = {Movie.movie1.year} </h3>
            <div class="remove-button">
              <button>Remove</button>
            </div>
          </div>
          <div class = "movie-item"> 
            <h3>name = {Movie.movie2.name} year = {Movie.movie2.year} </h3>
            <div class="remove-button">
              <button>Remove</button>
            </div>
          </div>
          <div class = "movie-item"> 
            <h3>name = {Movie.movie3.name} year = {Movie.movie3.year} </h3>
            <div class="remove-button">
              <button>Remove</button>
            </div>
          </div>
        </div>

        
        </div>
        
    );
}



export default WatchlistPage;