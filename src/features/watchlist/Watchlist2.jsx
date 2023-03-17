import React, {useContext} from 'react'
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import MovieCard from './MovieCard';
import MovieCard2 from './MovieCard2';
import RemoveFromWatchlsitButton from './RemoveFromWatchlistButton';
import "./MovieSearch2.css"
//import "./Watchlist2.css"
//import { useAuth } from "./auth/contexts/AuthContext";
//import "./watchlist.css"

//this is the watchlist page that will be rendered when called
//the watchlist page  will display all the MovieCards that the user has added to their watchlist
//the user will be able to remove movies from their watchlist using the remove button after each MovieCard


function Watchlist2(){
const {removeMovieFromWatchlist, watchlist} = useContext(WatchlistContext);

function displayCardPlusRemoveButton(movie){
  return(
    <div class = "movie-item">
              <MovieCard2
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
            />
            <RemoveFromWatchlsitButton movie={movie} />
              
    </div>
  )
}

  return(
    <div>
      <h1>Your Watchlist</h1>
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

export default Watchlist2
