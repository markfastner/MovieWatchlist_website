import { useState, useEffect } from 'react';
import MovieCard2 from './MovieCard2';
import AddToWatchlistButton from './AddToWatchlistButton';
import { useTranslation } from "react-i18next";

function MovieGenreList() {
  const genreId = 28;
  
  const {t} = useTranslation();

  const [value, setValue] = useState(28);
  const [name, setName] = useState("Action");
  const handleChange = (event) => {
    setValue(event.target.value);

    for(let i = 0; i < genre.length; i++) {
      if(genre[i].id == event.target.value) {
        setName(genre[i].name);
      }
    }
  }

  const genre = [
    {id: 28, name: "Action"},
    {id: 12, name: "Adventure"},
    {id: 16, name: "Animation"},
    {id: 35, name: "Comedy"},
    {id: 80, name: "Crime"},
    {id: 99, name: "Documentary"},
    {id: 18, name: "Drama"},
    {id: 10751, name: "Family"},
    {id: 14, name: "Fantasy"},
    {id: 36, name: "History"},
    {id: 27, name: "Horror"},
    {id: 10402, name: "Music"},
    {id: 9648, name: "Mystery"},
    {id: 10749, name: "Romance"},
    {id: 878, name: "Science Fiction"},
    {id: 10770, name: "TV Movie"},
    {id: 53, name: "Thriller"},
    {id: 10752, name: "War"},
    {id: 37, name: "Western"}
  ]
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_KEY = 'your_api_key_here';
    const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${'02949da4b2212ad21636aad608287a04'}&sort_by=popularity.desc&with_genres=${value}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results.slice(0, 5)); // Get first 5 movies
      })
      .catch(error => {
        console.error(error);
      });
  }, [value]);

  return (
    <div>

      { <div class = "MovieGenreList">
          <h1>{t('genrerectext')} {name} {t('movies')}</h1>
          <select 
          value = {value}
          onChange = {handleChange}
          class="genre">
            <option value="28">{t('action')}</option>
            <option value="12">{t('adventure')}</option>
            <option value="16">{t('animation')}</option>
            <option value="35">{t('comedy')}</option>
            <option value="80">{t('crime')}</option>
            <option value="99">{t('documentary')}</option>
            <option value="18">{t('drama')}</option>
            <option value="10751">{t('family')}</option>
            <option value="14">{t('fantasy')}</option>
            <option value="36">{t('history')}</option>
            <option value="27">{t('horror')}</option>
            <option value="10402">{t('music')}</option>
            <option value="9648">{t('mystery')}</option>
            <option value="10749">{t('romance')}</option>
            <option value="878">{t('sciencefiction')}</option>
            <option value="10770">{t('tvmovie')}</option>
            <option value="53">{t('thriller')}</option>
            <option value="10752">{t('war')}</option>
            <option value="37">{t('western')}</option>
          </select>
        </div> }
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
