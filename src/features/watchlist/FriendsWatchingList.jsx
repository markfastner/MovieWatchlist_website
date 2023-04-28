import React, { useEffect, useState } from "react";
import { useAuth } from "../../pages/auth/contexts/AuthContext";
import { db } from "../../firebase";
import Watchlist2 from "./Watchlist2";
import { getUIDFromName } from "./ShareWithFriendButton";
import MovieCard2 from "./MovieCard2";
import AddToWatchlistButton from "./AddToWatchlistButton";

function FriendsWatchingList() {
  const { currentUser } = useAuth();
  const userId = currentUser.uid;
  const [friends, setFriends] = useState([]);
  const friendsListRef = db.users.doc(userId).collection("friends");
  const [showFriendsWatchList, setShowFriendsWatchList] = useState(false);
  // Retrieve the list of friends from the database

  const [friendsWatch, setFriendsWatch] = useState([]);
  const [movieslist, setMoviesList] = useState([]);
  async function loadFriends() {
    console.log("loadFriends");
    const friendsSnapshot = await friendsListRef.get();
    const moviesSet = new Set();
    const friends = await Promise.all(
      friendsSnapshot.docs.map(async (doc) => {
        const friend = await getUserFromUsername(doc.data().friend);
        //looop through watchlists
        const friendWatchListRef = db.users.doc(friend.uid).collection('watchlists');
        const querySnapshot = await friendWatchListRef.get();
        querySnapshot.forEach((doc) => {
          if(doc.data().visability != false)//if watchlist is visable
          {
            doc.data().movies.forEach((movie) => {
              //if movie is not in movieslist, add it
              moviesSet.add(movie);
            });
          }
          
        });
        return friend;
      })
    );
    setFriends(friends);
    setFriendsWatch([...moviesSet]);
  }
  

  async function handleShowFriendsWatchList() {
    setShowFriendsWatchList(true);
    //load friends list
    await loadFriends();
  }

  function handleHideFriendsWatchList() {
    setShowFriendsWatchList(false);
  }

  // Load friends list and movies list
  useEffect(() => {
    loadFriends();
  }, []);

  // Update friendsWatch once movieslist is ready
  useEffect(() => {
    setFriendsWatch(movieslist);
  }, [movieslist]);

  function getPopularMovies(friendsWatch) {
    const movieCount = {};
    friendsWatch.forEach((movie) => {
      if (movieCount[movie.id]) {
        movieCount[movie.id] += 1;
      } else {
        movieCount[movie.id] = 1;
      }
    });
  
    const sortedMovies = Object.keys(movieCount).sort(
      (a, b) => movieCount[b] - movieCount[a]
    );
  
    const popularMovies = sortedMovies
      .slice(0, 5)
      .map((id) => friendsWatch.find((movie) => parseInt(movie.id) === parseInt(id)) || {});
  
    return popularMovies;
  }
  
  

  
  
  return (
    <div>
      {getPopularMovies(friendsWatch).map((movie) => (
        <div className="movie-item" key={movie?.id}>
          <MovieCard2
            posterPath={movie?.poster_path}
            title={movie?.title}
            releaseDate={movie?.release_date}
          />
          <AddToWatchlistButton movie={movie} />
        </div>
      ))}


      <h1>Friends Watchlists</h1>
      {!showFriendsWatchList && (
        <button
          onClick={handleShowFriendsWatchList}
          style={{
            backgroundColor: "#FFD700",
            border: "none",
            color: "white",
            padding: "8px 16px",
            textAlign: "center",
            textDecoration: "none",
            display: "inline-block",
            fontSize: "16px",
            borderRadius: "50px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          see what your friends are watching
        </button>
      )}
      {showFriendsWatchList && (
        <div>
          <button onClick = {handleHideFriendsWatchList} style={{backgroundColor: "#FFD700", border: "none", color: "white", padding: "8px 16px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "16px", borderRadius: "50px", cursor: "pointer", transition: "background-color 0.3s ease"}}>hide what your friends are watching</button>
          <div>
            {friends.map((friend) => (
              <div>
                {/* {console.log("friend uid: " + friend.uid)} */}
                <Watchlist2 
                userId = {friend.uid}
                isFriend = {true}
                />
              </div>
            ))}
          </div>
        </div>
      )}


      
    </div>
  );
}

async function getUserFromUsername(username) {
  const userSnapshot = await db.users
    .where("username", "==", username)
    .get();
  const user = userSnapshot.docs[0].data();
  return user;
}

export default FriendsWatchingList;
