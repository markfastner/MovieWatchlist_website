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
      console.log("Fetching watchlists...");
      try {
        const watchlistSSnapshot = await watchlistSRef.get();

        const watchlists = await Promise.all(
          watchlistSSnapshot.docs.map(async (doc) => {
            const watchlist = doc.data();
            console.log(watchlist);
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
    if (watchlists.length === 0) {
      setFetchWatchlists(true);
    }
  };

  return (
    <div>
      <select className="bg-white" onFocus={handleDropdownFocus}>
        <option selected>Add to Watchlist</option>
        {watchlists.map((watchlist) => (
          <option key={watchlist.title} value={watchlist.title}>
            {watchlist.title}
          </option>
        ))}
        <option value="test">testy</option>
        <option value="test">test</option>
      </select>
    </div>
  );
}
