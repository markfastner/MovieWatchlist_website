import React, {useContext} from 'react';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";

function AddToWatchlistButton(props) {
    const {addMovieToWatchlist, watchlist} = useContext(WatchlistContext);
    const {movie} = props; // destructure movie from props

    return(
        <div>
            {!watchlist.find(watchlist => watchlist.id === movie.id) ? (
            <button onClick={() => addMovieToWatchlist(movie)} className="btn">Add to Watchlist</button>
            ) : (
                <h2>already in watchlist</h2>
              )}
        </div>
        
    )
}

export default AddToWatchlistButton;
