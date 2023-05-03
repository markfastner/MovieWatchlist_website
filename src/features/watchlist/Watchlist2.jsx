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
import AddToWatchlistButton from './AddToWatchlistButton';
import ToggleWatchlistVisabilityButton from './ToggleWatchlistVisablityButton';
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

function Watchlist2(props){
  const userId = props.userId;
  const isFriend = props.isFriend;
  console.log("userid: " + userId);
const {removeMovieFromWatchlist, addMovieToWatchlist, watchlist} = useContext(WatchlistContext);
//const { currentUser } = useAuth();
//const userId = currentUser.uid;
//const watchlistRef = db.users.doc(userId).collection('watchlist');
const watchlistSRef = db.users.doc(userId).collection("watchlists");

//helper function to display the MovieCard and the RemoveFromWatchlistButton
function displayCardPlusRemoveButton(movie, watchlistTitle) {
  return (
    <div key={movie.id} class="movie-item">
      <MovieCard2
        posterPath={movie.poster_path}
        title={movie.title}
        releaseDate={movie.release_date}
        type={movie.media_type}
      />
      {!isFriend &&
        <RemoveFromWatchlistButton movie={movie} watchlistTitle={watchlistTitle} />
      }
      {isFriend &&
        <AddToWatchlistButton movie={movie}/>
      }
    </div>
  );
}

const [user, setUser] = useState([]);
async function getUser() {
  console.log("getting user");
  const userRef = db.users.doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such user!');
  } else {
    console.log("user: " + doc.data());
    setUser(doc.data());
  }
}

//helper function that gets the username of the current user
async function getUsername(userId) {
  const userRef = db.users.doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log('No such username');
  } else {
    return doc.data().username;
  }
}


const [watchlists, setWatchlists] = useState([]);
async function loadWatchlistsS(userId) {
  console.log("loading watchlists");
  const watchlistSRef = db.users.doc(userId).collection("watchlists");
  const watchlistSSnapshot = await watchlistSRef.get();
  const watchlists = await Promise.all(
    watchlistSSnapshot.docs.map(async (doc) => {
      console.log("watchlist: " + doc.data());
      const watchlist = doc.data();
      return watchlist;
    })
  );
  setWatchlists(watchlists);
  console.log("watchlists: " + watchlists);

  //if watchlists is empty, then we need to create a default watchlist
  if (watchlists.length == 0) {
    console.log("creating default watchlist");
    const username = await getUsername(userId);
    watchlistSRef.doc(username + "'s default Watchlist").set({
      title: username + "'s default Watchlist",
      movies: [],
      visability: true,
    });
  }
}



  useEffect(() => {
    getUser();
    //console.log("user: " + user);
    loadWatchlistsS(userId);
    const unsubscribe = watchlistSRef.onSnapshot(() => {
      loadWatchlistsS(userId);
    });
    return () => unsubscribe();
  }, [userId]);
  
  
  function removeWatchlist(watchlist) {
    console.log("removing watchlist");
    watchlistSRef.doc(watchlist.title).delete();
  }

  

  return (
    <div className="watchlists" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>{user.username}'s Watchlists</h1>
      {watchlists.map((watchlist, index) => {
        if (isFriend == true && watchlist.visability == false) {
        }
        else {
          return (
            <div key={watchlist.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'lightgrey', padding: '10px', borderRadius: '23px'}}>
                <h2 style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '1.5rem' }}>{`${index + 1}: ${watchlist.title}`}</h2>
                {!isFriend && (
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
                      color: 'white',
                    }}
                  >
                    delete watchlist
                  </button>
                )}
                {!isFriend && (
                  <ShareWithFriend 
                    watchlistTitle={watchlist.title}
                    watchlistMovies={watchlist.movies}
                    name={"monkey"}
                  />
                )}

                {!isFriend && (
                  <ToggleWatchlistVisabilityButton
                    watchlistTitle={watchlist.title}
                  />
                )}
              </div>
              <div className="movie-list">
                {watchlist.movies.map((movie) => (
                  <div key={movie.id}>
                    {displayCardPlusRemoveButton(movie, watchlist.title)}
                  </div>
                ))}
              </div>
            </div>
          );
        } 
      })}
    </div>
  );

  

  
  
}

export default Watchlist2