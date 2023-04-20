import React, { useContext } from 'react';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import {useAuth} from "../../pages/auth/contexts/AuthContext";
import { db, auth } from "../../firebase";

function RemoveFromWatchlistButton(props) {
    const {removeMovieFromWatchlist, watchlist} = useContext(WatchlistContext);
    const { movie, watchlistTitle} = props; // destructure movie from props

    const {currentUser} = useAuth()
    const userId = currentUser.uid;
    const watchlistSRef = db.users.doc(userId).collection("watchlists");
    const watchedlistRef = db.users.doc(userId).collection("watchedlist");
  return (
    <div className="flex justify-center items-end mb-4">
        <button onClick={() => Remove(removeMovieFromWatchlist, watchlistTitle, watchlistSRef, watchedlistRef, movie) } className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">remove from Watchlist</button>
      
    </div>
  );
}

async function Remove(removeMovieFromWatchlist, watchlistTitle, watchlistSRef, watchedlistRef, movieToRemove){
  //remove from local storage
  //removeMovieFromWatchlist(movie.id)

  //remove from db
  try {
    // Get the watchlist document
    const watchlistDoc = await watchlistSRef.doc(watchlistTitle).get();

    if (watchlistDoc.exists) {
      // Get the current movies in the watchlist
      const watchlistData = watchlistDoc.data();
      const currentMovies = watchlistData.movies || [];

      // Remove the movie from the movie list
      const updatedMovies = currentMovies.filter(movie => movie.id !== movieToRemove.id);

      // Update the watchlist with the new movie list
      await watchlistSRef.doc(watchlistTitle).update({
        movies: updatedMovies,
      });

      console.log("Movie removed from the watchlist:", watchlistTitle);
    } else {
      console.error("Watchlist not found:", watchlistTitle);
    }
  } catch (error) {
    console.error("Error updating watchlist:", error);
  }


  //add to watched list
    watchedlistRef.doc(movieToRemove.id.toString()).set({
    title: movieToRemove.title ,
    releaseDate: movieToRemove.release_date,
    movie_poster: movieToRemove.poster_path,
    movie_id: movieToRemove.id,
  });

}


export default RemoveFromWatchlistButton;
