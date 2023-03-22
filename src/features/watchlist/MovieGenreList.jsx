import { useState, useEffect } from 'react';
import MovieCard2 from './MovieCard2';
import AddToWatchlistButton from './AddToWatchlistButton';
function MovieGenreList({ genreId }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_KEY = 'your_api_key_here';
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${'02949da4b2212ad21636aad608287a04'}&sort_by=popularity.desc&with_genres=${genreId}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results.slice(0, 5)); // Get first 5 movies
      })
      .catch(error => {
        console.error(error);
      });
  }, [genreId]);

  return (
    <div>
      <h2>Movies of genre {genreId}:</h2>
      <ul>
        {movies.map(movie => (
          <div className="movie-item" key={movie.id}>
          <MovieCard2
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
            />
            <AddToWatchlistButton 
                movie={movie} />
        </div>
        ))}
      </ul>
    </div>
  );
}

export default MovieGenreList;
