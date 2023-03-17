import React, { useContext } from 'react';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";

function RemoveFromWatchlistButton(props) {
    const {removeMovieFromWatchlist, watchlist} = useContext(WatchlistContext);
    const { movie } = props; // destructure movie from props
  return (
    <div className="flex justify-center items-end mb-4">
        <button onClick={() => removeMovieFromWatchlist(movie.id) } className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">remove from Watchlist</button>
      
    </div>
  );
}

export default RemoveFromWatchlistButton;
