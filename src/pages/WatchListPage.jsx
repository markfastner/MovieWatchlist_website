import React, {useContext} from "react";
//import "../features/watchlist/watchlist.css";
import {useState, useEffect} from "react";
//import MovieSearch from "../features/watchlist/MovieSearch.js";
import AppReducer from "./auth/contexts/WatchlistReducer";
import { WatchlistProvider } from "./auth/contexts/WatchlistState";
import MostPopularMoviesList from "../features/watchlist/MostPopularMoviesList.jsx";
import MovieSearch from "../features/watchlist/MovieSearch2.jsx";
import Watchlist2 from "../features/watchlist/Watchlist2.jsx";
import "../features/watchlist/WatchlistPageStyle.css"
//c4a9a1cc
import OpenAIButton from "../features/watchlist/OpenAI.jsx";
import MovieGenreList from "../features/watchlist/MovieGenreList.jsx";
import { db, auth } from "../firebase"; // import your Firestore instance here
import {useAuth} from "./auth/contexts/AuthContext";
import { WatchlistContext } from "./auth/contexts/WatchlistState";
import WatchedList from "../features/watchlist/WatchedList.jsx";
import NewWatchlist from "../features/watchlist/newWatchlist";
import ShareWithFriend from "../features/watchlist/ShareWithFriendButton";
//const API_URL = 'http://www.omdbapi.com?apikey=c4a9a1cc'


// function UpdateWatchlistDB(userId, watchlistRef, watchlist) {
//   //loop through watchlist and add to watchlistRef
//   watchlist.length > 0 ? (
//     watchlist.map((movie) => {
//       //if statement to check if movie is already in db so duplicate movies arent added
//       if(!watchlistRef.doc(movie.id.toString()).exists) {
//         watchlistRef.doc(movie.id.toString()).set({
//           title: movie.title ,
//           releaseDate: movie.release_date,
//           movie_poster: movie.poster_path,
//           movie_id: movie.id,
//         });
//       }
//     })    
//   ):(console.log("no movies in watchlist")
//   )
//   //watchlistRef.doc('76600').delete();
//   deleteEverythingFromWatchlistDBnotInWatchlist(userId, watchlistRef, watchlist);
// }

// function deleteEverythingFromWatchlistDBnotInWatchlist(userId, watchlistRef, watchlist) {
//   //loop through watchlistRef and delete everything that is not in watchlist
//   watchlistRef.get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       let exists = false//assume the movie in db doesnt exist in watchlist
//       watchlist.map((movie) => {
//         if(doc.id == movie.id.toString()) {
//           exists = true
//         }
//       })
//       if(!exists) {//if the movie in db doesnt exist in watchlist, delete it
//         watchlistRef.doc(doc.id).delete();
//       }
//     });
//   }
//   );

// }


function WatchlistPage() {
    const {currentUser} = useAuth()
    const user = auth.currentUser;
    //const userId = user.uid;
    const userId = currentUser.uid;
    const {watchlist} = useContext(WatchlistContext);
    const watchlistRef = db.users.doc(userId).collection("watchlist");
    //UpdateWatchlistDB(userId, watchlistRef, watchlist);
    
    return (
      // this will be a list of movies that the user has added to their watchlist
      // the user will be able to add movies to their watchlist from the movie details page
      // the user will be able to remove movies from their watchlist from the watchlist page
      
      // the watchlist page will be a list of movies that the user has added to their watchlist
      
  
      <div class="watchlist-container">
        {/* Render the friends list */}
        <h1 class="header">
        Watchlist Page
        </h1>
        {/* <ShareWithFriend /> */}
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
          <OpenAIButton />
          
        </div>
        <div class = "movie-list">
          <Watchlist2 />
        </div>

        <div>
          <NewWatchlist />
        </div>

        <div class = "watched-list">
          <WatchedList />
        </div>
        
        { <div class = "MovieGenreList">
          <h1>Genre Recommendation for Action Movies</h1>
          <MovieGenreList 
          genreID = {28}/>
        </div> }


        { <div class = "recommendations">
          <h1>Most Popular Movies Now!</h1>
          <MostPopularMoviesList />
        </div> }

        
        <div class = "movie-search">
          <MovieSearch />
        </div>


        

      

        
        </div>
    );
}



export default WatchlistPage;