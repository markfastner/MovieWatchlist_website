import React, { useContext } from 'react';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import {useAuth} from "../../pages/auth/contexts/AuthContext";
import { db, auth } from "../../firebase";

function RemoveFromWatchlistButton(props) {
    const {removeMovieFromWatchlist, watchlist} = useContext(WatchlistContext);
    const { movie } = props; // destructure movie from props

    const {currentUser} = useAuth()
    const userId = currentUser.uid;
    const watchlistRef = db.users.doc(userId).collection("watchlist");
  return (
    <div className="flex justify-center items-end mb-4">
        <button onClick={() => Remove(removeMovieFromWatchlist, watchlistRef, movie) } className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">remove from Watchlist</button>
      
    </div>
  );
}

function Remove(removeMovieFromWatchlist, watchlistRef, movie){
  removeMovieFromWatchlist(movie.id)

  watchlistRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if(doc.id == movie.id.toString()) {
        watchlistRef.doc(doc.id).delete();
      }
    });
  }
  );

}


export default RemoveFromWatchlistButton;
