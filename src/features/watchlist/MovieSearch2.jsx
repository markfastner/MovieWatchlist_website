import React, { useContext, useState } from 'react';
import axios from 'axios';
import MovieCard2 from './MovieCard2';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
//import "./MovieSearch.css"
const API_KEY = 'your_tmdb_api_key_here';

function MovieSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const {addMovieToWatchlist, watchlist} = useContext(WatchlistContext);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${"02949da4b2212ad21636aad608287a04"}&query=${query}`);
    setResults(response.data.results);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Search for a movie" value={query} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {results.length > 0 && (
        <div className="movie-list">
          {results.map((movie) => (
            <><MovieCard2
              key={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
            />
            {!watchlist.find(watchlist => watchlist.id === movie.id) ? (
                            <button onClick={() => addMovieToWatchlist(movie)} className="btn">Add to Watchlist</button>
                            ) : (
                                <h2>already in watchlist</h2>
                              )}
                            
            </>

          ))}
        </div>
      )}
    </div>
  );
}

export default MovieSearch;
