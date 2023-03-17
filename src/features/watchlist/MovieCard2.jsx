import React from 'react';
//import "./MovieCard2.css";
function MovieCard(props) {
  const { posterPath, title, releaseDate } = props;

  // format the release date to display only the year
  const year = new Date(releaseDate).getFullYear();

  // build the poster image URL
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} />
      <div className="movie-info">
        <h2>{title}</h2>
        <p>{year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
