import React, {useEffect, useState, useContext} from 'react'
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import MovieCard2 from './MovieCard2';
import RemoveFromWatchlistButton from './RemoveFromWatchlistButton';
import "./MovieSearch2.css"
import axios from "axios";
import { db, auth } from "../../firebase";
import {useAuth} from "../../pages/auth/contexts/AuthContext";
import { wait } from '@testing-library/user-event/dist/utils';
//import "./Watchlist2.css"
//import { useAuth } from "./auth/contexts/AuthContext";
//import "./watchlist.css"

//this is the watchlist page that will be rendered when called
//the watchlist page  will display all the MovieCards that the user has added to their watchlist
//the user will be able to remove movies from their watchlist using the remove button after each MovieCard


function Watchlist2(){
const {removeMovieFromWatchlist, addMovieToWatchlist, watchlist} = useContext(WatchlistContext);
const { currentUser } = useAuth();
const userId = currentUser.uid;
const watchlistRef = db.users.doc(userId).collection('watchlist');
const API_KEY = '02949da4b2212ad21636aad608287a04';

//helper function to display the MovieCard and the RemoveFromWatchlistButton
function displayCardPlusRemoveButton(movie){
  return(
    <div key={movie.id} class = "movie-item">
              <MovieCard2
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
              type = {movie.media_type}
            />
            <RemoveFromWatchlistButton movie={movie} />
              
    </div>
  )
}
//helper function that will return a movie given the movie id
async function GetMovieByID(id) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  //console.log("RD" + response.data.title);
  return response.data;
}

//loadwatchlist function which updates the watchlist state based of database
const [movies, setMovies] = useState([]);

  async function loadWatchlist(){
    const watchlistSnapshot = await watchlistRef.get();
    const movies = await Promise.all(watchlistSnapshot.docs.map(async (doc) => {
      const movie = await GetMovieByID(doc.id);
      return movie;
    }));
    setMovies(movies);
  }

  useEffect(() => {
    loadWatchlist();

    // Listen for changes to the watchlist
    const unsubscribe = watchlistRef.onSnapshot(() => {
      loadWatchlist();
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return(
    <div>
      <h1>Your Watchlist</h1>
      <div class="movie-list"> 
        {movies.map((movie) => (
          <div key={movie.id}>
            {displayCardPlusRemoveButton(movie)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watchlist2