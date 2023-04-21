import React, { useContext, useState } from 'react';
import axios from 'axios';
import MovieCard2 from './MovieCard2';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import AddToWatchlistButton from './AddToWatchlistButton';
import "./MovieSearch2.css"


const API_KEY = '02949da4b2212ad21636aad608287a04';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { addMovieToWatchlist, watchlist } = useContext(WatchlistContext);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);

    // make API call to search for movies when user types at least 3 characters
    if (value.length >= 3) {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}`
      );
      setResults(response.data.results);
    } else {
      // clear results if query is empty or less than 3 characters
      setResults([]);
    }
  };

  return (
    <div>
      <h1>Find Movies</h1>
      <form>
        <input className ="rounded-full bg-yellow-400 text-black" type="text" placeholder="Search for a movie" value={query} onChange={handleInputChange} />
      </form>
      {results.length > 0 && (
        <div className="movie-list">
          {results.map((movie) => (
            <div className = "movie-item">
              <MovieCard2
                key={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
              />
              <AddToWatchlistButton movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}



export default MovieSearch;
