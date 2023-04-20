import React, { useContext, useState} from 'react';
import { WatchlistContext } from "../../pages/auth/contexts/WatchlistState";
import {useAuth} from "../../pages/auth/contexts/AuthContext";
import { db, auth } from "../../firebase";
//import "./MovieSearch2.css"
export default function AddToWatchlistButton(props) {
  
  const { movie } = props; // destructure movie from props
  const { addMovieToWatchlist, watchlist } = useContext(WatchlistContext);
  const {currentUser} = useAuth()
  const userId = currentUser.uid;
  const watchlistRef = db.users.doc(userId).collection("watchlist");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  function handleClick(selectedWatchlist) {
    // addMovieToWatchlist(movie, selectedWatchlist);
    // watchlistsRef.doc(selectedWatchlist.id).collection("movies").doc(movie.id.toString()).set({
    //   title: movie.title,
    //   releaseDate: movie.release_date,
    //   movie_poster: movie.poster_path,
    //   movie_id: movie.id,
    // });
    // setDropdownOpen(false);
  }


  return (
//     <div className="flex justify-center items-end mb-4">
//       <div className="relative">
//         <button
//           className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           onMouseEnter={() => setDropdownOpen(true)}
//           onMouseLeave={() => setDropdownOpen(false)}
//         >
//           Add to Watchlist
//         </button>
//         {dropdownOpen && (
//   <div className="absolute z-10 top-full mt-2 w-full bg-white rounded-lg shadow-lg">
//     <ul className="py-2">
//       <li
//         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//         onClick={() => handleClick(watchlist[0])}
//       >
//         {watchlist[0].name}
//       </li>
//       <li
//         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//         onClick={() => handleClick(watchlist[1])}
//       >
//         {watchlist[1].name}
//       </li>
//       <li
//         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//         onClick={() => handleClick(watchlist[2])}
//       >
//         {watchlist[2].name}
//       </li>
//     </ul>
//   </div>
// )}

//       </div>
//     </div>


    <div>
      {/* <button>
        Add to Watchlist
      </button> */}
      <select className="bg-white">
        <option selected>Add to Watchlist</option>
        <option value="test">testtestestestestestesttesttestestestestestest</option>
        <option value="test">test</option>
        <option value="test">test</option>
        <option value="watchlist0" onClick={() => handleClick(watchlist[0])}>{watchlist[0].name}</option>
        <option value="watchlist1" onClick={() => handleClick(watchlist[1])}>{watchlist[1].name}</option>
        <option value="watchlist2" onClick={() => handleClick(watchlist[2])}>{watchlist[2].name}</option>

        {/* Add additional options here */}
      </select>
    </div>
  );
}

function Add(movie, watchlistRef, addMovieToWatchlist){
//add to local storage
  addMovieToWatchlist(movie)
  
  //add to db
  if(!watchlistRef.doc(movie.id.toString()).exists) {
    watchlistRef.doc(movie.id.toString()).set({
      title: movie.title ,
      releaseDate: movie.release_date,
      movie_poster: movie.poster_path,
      movie_id: movie.id,
    });
  }

}



