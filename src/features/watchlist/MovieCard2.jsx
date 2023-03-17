import React from 'react';
//import "./MovieCard2.css";

function MovieCard(props) {
  const { posterPath, title, releaseDate } = props;

  // format the release date to display only the year
  const year = new Date(releaseDate).getFullYear();

  // build the poster image URL
  const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="relative group movie-card">
      <img src={posterUrl} alt={title} className="rounded-lg" />
      <div className="absolute top-0 left-0 w-full h-full p-4 bg-black bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2">{year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
