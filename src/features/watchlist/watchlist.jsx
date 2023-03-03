import React, {useContext} from 'react'
import { GlobalContext } from "../../pages/auth/contexts/GlobalState";
import MovieCard from './MovieCard'
//import { useAuth } from "./auth/contexts/AuthContext";

function AddMovie(movieID){
   
    
  //const {currentUser} = useAuth()
   //useAuth.createSubcollection("watchlist")
   Watchlist.idlist.push(movieID)
  return console.log(movieID)
}

function Watchlist(){
const {watchlist} = useContext(GlobalContext);

  return(
    <div>
      <h1>Watchlist</h1>

      <div class = "movie-item"> 
            {watchlist.map((movie) => (
              <h1>{movie.Title}</h1>
            ))}
            <h3>name {AddMovie.idlist}</h3>
            
            <div class="remove-button">
              <button>Remove</button>
            </div>
          </div>
          <div class = "movie-item"> 
            <h3>name </h3>
            <div class="remove-button">
              <button>Remove</button>
            </div>
          </div>
          <div class = "movie-item"> 
            <h3>name</h3>
            <div class="remove-button">
              <button>Remove</button>
            </div>
          </div>
    </div>
  )
}

export default Watchlist
export { AddMovie }