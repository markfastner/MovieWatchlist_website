import React, {useContext} from "react";
import {useState, useEffect} from "react";
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
import './MovieSearch.css';
import { GlobalContext } from "../../pages/auth/contexts/GlobalState";
//c4a9a1cc

const API_URL = 'http://www.omdbapi.com?apikey=c4a9a1cc'

const MovieSearch = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const {addMovieToWatchlist, watchlist} = useContext(GlobalContext);
    //let storedMovie = watchlist.find(watchlist => watchlist.imdbID === movie.imdbID);
    //const watchlistDisabled = storedMovie ? true : false;


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    return (
        <div className = 'app'>
            <h1>MovieLand</h1>

            <div className = 'search'>
                <input
                    placeholder="Search for movies"
                    value = {searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className ="container">
                        {movies.map((movie) => (
                            <><MovieCard movie={movie} />
                            {!watchlist.find(watchlist => watchlist.imdbID === movie.imdbID) ? (
                            <button onClick={() => addMovieToWatchlist(movie)} className="btn">Add to Watchlist</button>
                            ) : (
                                <h2>already in watchlist</h2>
                              )}
                            </>

                        ))}

                        
                    </div>
                ) : (
                    <div className = "empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
            

        </div>
    )
}

export default MovieSearch;

