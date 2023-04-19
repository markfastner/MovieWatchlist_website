import {useAuth} from "../../pages/auth/contexts/AuthContext";
import { db, auth } from "../../firebase";
import React, { useContext } from 'react';

function ShareWithFriend(watchlist, name){
    return(
        <div className="ShareWithFriend">
            <button onClick = {handleClick(watchlist, name)} style={{padding: "8px 16px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer"}}>sharewithfriend button</button>
        </div>
                
    )
}

async function getUIDFromName(name){
    const userRef = db.users.where("name", "==", name);
    const doc = await userRef.get();
    if (!doc.empty) {
        return doc.id;
    } else {
        console.log("No such document!");
    }
}

function handleClick(watchlist, name){
    //const {currentUser} = useAuth()
    const userId = getUIDFromName(name);
    const watchlistSRef = db.users.doc(userId).collection("watchlists");

    watchlistSRef.doc(name).set({
        title: "watchlist1",
        movies: [],
    });
}
export default ShareWithFriend;