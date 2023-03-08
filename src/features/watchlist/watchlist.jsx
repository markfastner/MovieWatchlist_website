import React, {useContext} from 'react'
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import MovieCard from './MovieCard'
//import { useAuth } from "./auth/contexts/AuthContext";
//import "./watchlist.css"

//this is the watchlist page that will be rendered when called
//the watchlist page  will display all the MovieCards that the user has added to their watchlist
//the user will be able to remove movies from their watchlist using the remove button after each MovieCard


function Watchlist(){
const {removeMovieFromWatchlist, watchlist} = useContext(WatchlistContext);

function displayCardPlusRemoveButton(movie){
  return(
    <div class = "movie-item">
              <MovieCard movie={movie} />
              <button onClick={() => removeMovieFromWatchlist(movie.imdbID)}>remove from Watchlist</button>
    </div>
  )
}

  return(
    <div>
      <h1>Watchlist</h1>
      {watchlist.length > 0 ? (
      <div class = "movie-list"> 
            {watchlist.map(displayCardPlusRemoveButton)}         
      </div>
      ) : (
        <h2>Your watchlist is empty. Go find some movies!</h2>
      )}
    </div>
  )
}

export default Watchlist
