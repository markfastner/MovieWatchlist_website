import React, { useContext, useState, useEffect } from "react";
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import AddToWatchlistButton from "./AddToWatchlistButton";
import MovieCard2 from "./MovieCard2";
import "./MovieSearch2.css"

function Recommendations() {
  const [movies, setMovies] = useState([]);
  const {addMovieToWatchlist, watchlist} = useContext(WatchlistContext);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=02949da4b2212ad21636aad608287a04&sort_by=popularity.desc&language=en-US&page=1&vote_count.gte=5000"
      );
      const data = await response.json();
      setMovies(data.results.slice(0, 5));
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Most Popular Movies</h2>
        {movies.map((movie) => (
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
    </div>
  );
}

export default Recommendations;
