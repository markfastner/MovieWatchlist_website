import React, { useContext } from 'react';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
//import "./MovieSearch2.css"
function AddToWatchlistButton(props) {
  const { addMovieToWatchlist, watchlist } = useContext(WatchlistContext);
  const { movie } = props; // destructure movie from props

  return (
    <div className="flex justify-center items-end mb-4">
      {!watchlist.find((watchlist) => watchlist.id === movie.id) ? (
        <button
          onClick={() => addMovieToWatchlist(movie)}
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

export default AddToWatchlistButton;
