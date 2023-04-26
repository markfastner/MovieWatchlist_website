import React, {useEffect, useState, useContext} from 'react'
import { db, auth } from "../../firebase";
import {useAuth} from "../../pages/auth/contexts/AuthContext";
import {GetMovieByID} from "./Watchlist2.jsx";
import MovieCard2 from "./MovieCard2.jsx";
import "./MovieSearch2.css"

function handleRemoveFromWatchedList(movie, watchedlistRef){
    console.log("remove from watchedlist");
    watchedlistRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.id == movie.id.toString()) {
            watchedlistRef.doc(doc.id).delete();
          }
        });
      }
      );
}
function displayCardPlusRemoveButton(movie, watchedlistRef){
    return(
      <div key={movie.id} class = "movie-item">
                <MovieCard2
                posterPath={movie.poster_path}
                title={movie.title}
                releaseDate={movie.release_date}
                type = {movie.media_type}
              />
              <button onClick = {() => handleRemoveFromWatchedList(movie, watchedlistRef)}>Remove</button>
                
      </div>
    )
  }


  function WatchedList() {
    const { currentUser } = useAuth();
    const userId = currentUser.uid;
    const watchedlistRef = db.users.doc(userId).collection('watchedlist');
  
    const [movies, setMovies] = useState([]);
    const [showWatchedList, setShowWatchedList] = useState(false);
  
    async function loadWatchedlist() {
      const watchedlistSnapshot = await watchedlistRef.get();
      const movies = await Promise.all(
        watchedlistSnapshot.docs.map(async (doc) => {
          const movie = await GetMovieByID(doc.id);
          return movie;
        })
      );
      setMovies(movies);
    }
  
    useEffect(() => {
      loadWatchedlist();
  
      // Listen for changes to the watchlist
      const unsubscribe = watchedlistRef.onSnapshot(() => {
        loadWatchedlist();
      });
  
      // Unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    }, []);
  
    function handleShowWatchedList() {
      setShowWatchedList(true);
    }
  
    function handleHideWatchedList() {
      setShowWatchedList(false);
    }
  
    return (
      <div>
        <h1>Watched List</h1>
        {!showWatchedList && (
          <button onClick={handleShowWatchedList} style={{backgroundColor: "#4caf50", border: "none", color: "white", padding: "8px 16px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", borderRadius: "50px", cursor: "pointer", transition: "background-color 0.3s ease"}}>
          Reveal Your Watched List
        </button>
        
        )}
        {showWatchedList && (
          <div>
            
            <button onClick={handleHideWatchedList} style={{backgroundColor: "#4caf50", border: "none", color: "white", padding: "8px 16px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", borderRadius: "50px", cursor: "pointer", transition: "background-color 0.3s ease"}}>
            Hide Your Watched List</button>
            <div class="movie-list">
              {movies.map((movie) => (
                <div key={movie.id}>{displayCardPlusRemoveButton(movie, watchedlistRef)}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  

export default WatchedList;