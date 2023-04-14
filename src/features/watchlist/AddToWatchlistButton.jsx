import React, { useContext } from 'react';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import {useAuth} from "../../pages/auth/contexts/AuthContext";
import { db, auth } from "../../firebase";
//import "./MovieSearch2.css"
export default function AddToWatchlistButton(props) {
  
  const { movie } = props; // destructure movie from props
  const { addMovieToWatchlist, watchlist } = useContext(WatchlistContext);
  const {currentUser} = useAuth()
  const userId = currentUser.uid;
  const watchlistRef = db.users.doc(userId).collection("watchlist");
  return (
    <div className="flex justify-center items-end mb-4">
      {!watchlist.find((watchlist) => watchlist.id === movie.id) ? (
        <button
          onClick={() => Add(movie, watchlistRef, addMovieToWatchlist)}
          className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to Watchlist
        </button>
      ) : (
        <h2 className="after-click">Added</h2>
      )}
    </div>
  );
}

function Add(movie, watchlistRef, addMovieToWatchlist){

  addMovieToWatchlist(movie)
  
  if(!watchlistRef.doc(movie.id.toString()).exists) {
    watchlistRef.doc(movie.id.toString()).set({
      title: movie.title ,
      releaseDate: movie.release_date,
      movie_poster: movie.poster_path,
      movie_id: movie.id,
    });
  }

}



