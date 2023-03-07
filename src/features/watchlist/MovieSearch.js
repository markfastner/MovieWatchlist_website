import React from "react";
import {useState, useEffect} from "react";
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
// import './MovieSearch.css';
//c4a9a1cc

const API_URL = 'http://www.omdbapi.com?apikey=c4a9a1cc'

const MovieSearch = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    return (
        <div className = 'app bg-blue-400'>
            <h1>MovieLand</h1>

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
                            <MovieCard movie={movie} />
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

