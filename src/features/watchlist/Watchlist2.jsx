import React, {useEffect, useState, useContext} from 'react'
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import MovieCard2 from './MovieCard2';
import RemoveFromWatchlistButton from './RemoveFromWatchlistButton';
import "./MovieSearch2.css"
import axios from "axios";
import { db, auth } from "../../firebase";
import {useAuth} from "../../pages/auth/contexts/AuthContext";
import { wait } from '@testing-library/user-event/dist/utils';
import ShareWithFriend from './ShareWithFriendButton';
//import "./Watchlist2.css"
//import { useAuth } from "./auth/contexts/AuthContext";
//import "./watchlist.css"

//this is the watchlist page that will be rendered when called
//the watchlist page  will display all the MovieCards that the user has added to their watchlist
//the user will be able to remove movies from their watchlist using the remove button after each MovieCard


//helper function that will return a movie given the movie id
export async function GetMovieByID(id) {
  const API_KEY = '02949da4b2212ad21636aad608287a04';
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  //console.log("RD" + response.data.title);
  return response.data;
}

function Watchlist2(){
const {removeMovieFromWatchlist, addMovieToWatchlist, watchlist} = useContext(WatchlistContext);
const { currentUser } = useAuth();
const userId = currentUser.uid;
const watchlistRef = db.users.doc(userId).collection('watchlist');
const watchlistSRef = db.users.doc(userId).collection("watchlists");

//helper function to display the MovieCard and the RemoveFromWatchlistButton
function displayCardPlusRemoveButton(movie, watchlistTitle){
  return(
    <div key={movie.id} class = "movie-item">
              <MovieCard2
              posterPath={movie.poster_path}
              title={movie.title}
              releaseDate={movie.release_date}
              type = {movie.media_type}
            />
            <RemoveFromWatchlistButton movie={movie}
            watchlistTitle = {watchlistTitle} />
              
    </div>
  )
}

//helper function that gets the username of the current user
async function getUsername(userId){
  const userRef = db.users.doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    return doc.data().username;
  }
}


//loadwatchlist function which updates the watchlist state based of database


  const [watchlists, setWatchlists] = useState([]);
  async function loadWatchlistsS() {
    const watchlistSSnapshot = await watchlistSRef.get();
    const watchlists = await Promise.all(
      watchlistSSnapshot.docs.map(async (doc) => {
        const watchlist = doc.data();
        return watchlist;
      })
    );
    setWatchlists(watchlists);


    //if watchlists is empty, then we need to create a default watchlist
    if (watchlists.length == 0) {
      console.log("creating default watchlist");
      const username = await getUsername(userId);
      watchlistSRef.doc(username + "'s Watchlist").set({
        title: username + "'s Watchlist",
        movies: [],
      });
    }
  }


  useEffect(() => {
    loadWatchlistsS();
  
    // Listen for changes to the watchlists
    const unsubscribe = watchlistSRef.onSnapshot(() => {
      loadWatchlistsS();
    });
  
    // Unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  
  function removeWatchlist(watchlist) {
    console.log("removing watchlist");
    watchlistSRef.doc(watchlist.title).delete();
  }
  return (
    <div className="watchlists">
      <h1>Your Watchlists</h1>
      {watchlists.map((watchlist) => (
        <div key={watchlist.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1 style={{ marginRight: '10px' }}>{watchlist.title}</h1>
            <button
              onClick={() => removeWatchlist(watchlist)}
              style={{
                backgroundColor: 'red',
                border: '1px solid #ccc',
                borderRadius: '50px',
                padding: '8px 12px',
                fontSize: '16px',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer',
              }}
            >
              delete watchlist
            </button>

            <ShareWithFriend 
            watchlistTitle = {watchlist.title}
            watchlistMovies = {watchlist.movies}
            name = {"monkey"}
            />

          </div>
          <div className="movie-list">
            {watchlist.movies.map((movie) => (
              <div key={movie.id}>
                {displayCardPlusRemoveButton(movie, watchlist.title)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  
}

export default Watchlist2