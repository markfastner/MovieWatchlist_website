import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./WatchlistReducer";

//this is the file that manages the state of the watachlist
//defines the initial state and the actions that can be performed on the state

// initial state
const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  watched: localStorage.getItem("watched")
    ? JSON.parse(localStorage.getItem("watched"))
    : [],
};

// create context
export const WatchlistContext = createContext(initialState);

// provider components
export const WatchlistProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  // actions
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  // const addMovieToWatched = (movie) => {
  //   dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  // };

  // const moveToWatchlist = (movie) => {
  //   dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  // };

  // const removeFromWatched = (id) => {
  //   dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  // };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        //addMovieToWatched,
        //moveToWatchlist,
        //removeFromWatched,
      }}
    >
      {props.children}
    </WatchlistContext.Provider>
  );
};