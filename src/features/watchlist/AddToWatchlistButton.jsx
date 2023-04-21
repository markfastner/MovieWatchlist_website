import React, { useContext, useState, useEffect } from 'react';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import { useAuth } from "../../pages/auth/contexts/AuthContext";
import { db, auth } from "../../firebase";
// import "./MovieSearch2.css"

export default function AddToWatchlistButton(props) {
  const { movie } = props; // destructure movie from props
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  const watchlistSRef = db.users.doc(userId).collection("watchlists");
  const [watchlists, setWatchlists] = useState([]);
  const [fetchWatchlists, setFetchWatchlists] = useState(false);

  useEffect(() => {
    if (!fetchWatchlists) return;

    async function loadWatchlistsS() {
      //console.log("Fetching watchlists...");
      try {
        const watchlistSSnapshot = await watchlistSRef.get();

        const watchlists = await Promise.all(
          watchlistSSnapshot.docs.map(async (doc) => {
            const watchlist = doc.data();
            //console.log(watchlist);
            return watchlist;
          })
        );

        setWatchlists(watchlists);
        setFetchWatchlists(false);
      } catch (error) {
        console.error("Error fetching watchlists:", error);
      }
    }

    loadWatchlistsS();
  }, [fetchWatchlists]); // fetchWatchlists as a dependency

  const handleDropdownFocus = () => {
      setFetchWatchlists(true);
  };

  const handleSelection = async (event) => {
    const selectedOption = event.target.value;
    console.log("Selected option:", selectedOption);
  
    // Check if the selected option is not the default one ("Add to Watchlist")
    if (selectedOption !== "Add to Watchlist") {
      try {
        // Get the watchlist document
        const watchlistDoc = await watchlistSRef.doc(selectedOption).get();
  
        if (watchlistDoc.exists) {
          // Get the current movies in the watchlist
          const watchlistData = watchlistDoc.data();
          const currentMovies = watchlistData.movies || [];
          
          // Check if the movie is already in the watchlist
          const movieExists = currentMovies.some(
            (currentMovie) => currentMovie.id === movie.id
          );

          if(movieExists){
            console.log("Movie already in the watchlist:", selectedOption);
            return;
          }
          // Add the selected movie to the movie list
          const updatedMovies = [...currentMovies, movie];
  
          // Update the watchlist with the new movie list
          await watchlistSRef.doc(selectedOption).update({
            movies: updatedMovies,
          });
  
          console.log("Movie added to the watchlist:", selectedOption);
        } else {
          console.error("Watchlist not found:", selectedOption);
        }
      } catch (error) {
        console.error("Error updating watchlist:", error);
      }
    }

    // Reset the dropdown selection
    event.target.value = "Add to Watchlist";
  };
  
  

  return (
    <div>
      <select className="bg-white" onFocus={handleDropdownFocus} onChange={handleSelection}>
        <option selected>Add to Watchlist</option>
        {watchlists.map((watchlist) => (
          <option key={watchlist.title} value={watchlist.title}>
            {watchlist.title}
          </option>
        ))}
      </select>
    </div>
  );
}
