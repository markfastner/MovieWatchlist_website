import {useAuth} from "../../pages/auth/contexts/AuthContext";
import { db, auth } from "../../firebase";
import React, { useContext } from 'react';


function NewWatchlist(){

    const {currentUser} = useAuth()
    const userId = currentUser.uid;
    const watchlistSRef = db.users.doc(userId).collection("watchlists");

    function handleClick(name){
        watchlistSRef.doc(name).set({
            title: name,
            movies: [],
            visability: true,
        });
        
    }
    return(
        <div>
            <div>
            <div className="justify justify-start mx-10 my-10 p-5"style={{display: "flex", alignItems: "center"}}>
                <input type="text" id="watchlist-input" placeholder="Watchlist name" style={{padding: "8px", border: "2px solid #ccc", borderRadius: "4px", marginRight: "8px"}} />
                <button onClick={() => handleClick(document.getElementById("watchlist-input").value)} style={{padding: "8px 16px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "50px", cursor: "pointer"}}>Create A New Watchlist</button>
            </div>

            </div>

        </div>
    )
}

export default NewWatchlist;
