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

import { useTranslation } from "react-i18next";
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
    
    const [name, setName] = useState("");
    const [value, setValue] = useState([]);

    const { t } = useTranslation();
    

  

    return (
      // this will be a list of movies that the user has added to their watchlist
      // the user will be able to add movies to their watchlist from the movie details page
      // the user will be able to remove movies from their watchlist from the watchlist page
      
      // the watchlist page will be a list of movies that the user has added to their watchlist
      
  
      <div class="watchlist-container dark:bg-slate-700 bg-blue-200">
        {/* Render the friends list */}

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

        <div>
          <NewWatchlist />
        </div>

        <div class = "movie-list"
        style = {{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
          <Watchlist2
          userId = {userId}
          isFriend = {false}
          />
        </div>

        

        <div class = "watched-list flex justify justify-center items-center ">
          <WatchedList />
        </div>
        


        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <a href="/discover Movies" style={{ 
            padding: '20px 40px', 
            backgroundColor: '#5e76cc', 
            color: '#fff', 
            borderRadius: '50px', 
            textDecoration: 'none', 
            textTransform: 'uppercase', 
            fontWeight: 'bold', 
            fontSize: '2rem',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            transition: 'background-color 0.3s ease',
          }}>
            Discover Movies To Add
          </a>
        </div>




        


        

      

        
        </div>
    );
}



export default WatchlistPage;