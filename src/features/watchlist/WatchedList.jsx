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


function WatchedList(){

    const { currentUser } = useAuth();
    const userId = currentUser.uid;
    const watchedlistRef = db.users.doc(userId).collection('watchedlist');

    const [movies, setMovies] = useState([]);

    async function loadWatchedlist(){
        const watchedlistSnapshot = await watchedlistRef.get();
        const movies = await Promise.all(watchedlistSnapshot.docs.map(async (doc) => {
        const movie = await GetMovieByID(doc.id);
        return movie;
    }));
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


return(
    <div>
        <h1>Watched List</h1>

        <div class="movie-list"> 
        {movies.map((movie) => (
          <div key={movie.id}>
            {displayCardPlusRemoveButton(movie, watchedlistRef)}
          </div>
        ))}
      </div>

    </div>
)
}

export default WatchedList;