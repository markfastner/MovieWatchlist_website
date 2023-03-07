import React, {useContext} from "react";
import {useState, useEffect} from "react";
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
import './MovieSearch.css';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
//api key: c4a9a1cc

// this is the MovieSearch component which is used to search for movies using the OMDB API
// the search results are displayed in the MovieCard component
// search result also has a button to add the movie to the watchlist
const API_URL = 'http://www.omdbapi.com?apikey=c4a9a1cc'

const MovieSearch = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const {addMovieToWatchlist, watchlist} = useContext(WatchlistContext);
    //let storedMovie = watchlist.find(watchlist => watchlist.imdbID === movie.imdbID);
    //const watchlistDisabled = storedMovie ? true : false;


    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    return (
        <div className = 'app'>
            <h1>Moviehub</h1>

            <div className = "relative flex-col rounded-full bg-gray-400">
                
                <input
                    className ="rounded-full bg-green-400 text-white"
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

