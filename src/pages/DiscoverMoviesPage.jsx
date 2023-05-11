import React from 'react';
import MovieGenreList from '../features/watchlist/MovieGenreList';
import MostPopularMoviesList from '../features/watchlist/MostPopularMoviesList';
import MovieSearch from '../features/watchlist/MovieSearch2';
import FriendsWatchingList from '../features/watchlist/FriendsWatchingList';

function DiscoverMoviesPage(){
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}
        className="bg-blue-200 dark:bg-slate-800"
        >
          
      
          <a href="/watchlist" 
            style={{
                padding: '20px 40px', 
                backgroundColor: '#5e76cc', 
                color: '#fff', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                textTransform: 'uppercase', 
                fontWeight: 'bold', 
                fontSize: '1.5rem',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                transition: 'background-color 0.3s ease',
                alignSelf: 'left',
                width: '300px',
                margin: '20px'
            }}>
            Back To Watchlist
          </a>
      
          <div className ="movie-search"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'center',
              width: '100%',
              height: '100%',
            }}>
            <MovieSearch />
          </div>
      
          <div class="MovieGenreList mx-10">
            {/* <MovieGenreList genreID={28} /> */}
            <MovieGenreList />   
          <div class="recommendations">
            <h1 style={{ alignSelf: 'center' }}>Most Popular Movies Now!</h1>
            <MostPopularMoviesList />
          </div>

          <div>
            <h1 style={{ alignSelf: 'center' }}>What Friends Are Watching</h1>
            <FriendsWatchingList />
          </div>
        </div>
        </div>
    );  
}

export default DiscoverMoviesPage;