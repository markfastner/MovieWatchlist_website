import React, {useContext} from "react";
import addMovie from "./watchlist.jsx";
import { GlobalContext } from "../../pages/auth/contexts/GlobalState";
const MovieCard = ({ movie }) => {
const {addMovieToWatchlist, watchlist} = useContext(GlobalContext);
  return (
    <div className="movie">
      <div>
        <p>{movie.Year}</p>
      </div>

      <div>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400"
          }
          alt={movie.Title}
        />
      </div>

      <div>
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
        <button onClick={() => addMovieToWatchlist(movie)} className="btn">Add to Watchlist</button>
        {console.log(watchlist.find(watchlist => watchlist.imdbID === movie.imdbID))}
      </div>
    </div>
  );
};

export default MovieCard;
