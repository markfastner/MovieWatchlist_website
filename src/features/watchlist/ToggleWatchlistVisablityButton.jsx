import React, {useState, useEffect, useContext} from 'react';
import { db, auth } from "../../firebase";
import {useAuth} from "../../pages/auth/contexts/AuthContext";
function ToggleWatchlistVisabilityButton({watchlistTitle}){
    const { currentUser } = useAuth();
    const userId = currentUser.uid;
    const watchlistRef = db.users.doc(userId).collection("watchlists").doc(watchlistTitle);
    
    const [isOn, setIsOn] = useState(watchlistRef.visability);
    async function handleClickVisability(){
        console.log("handleClickVisability");
        setIsOn(!isOn);

        //update database
        //if ison is true change visability for watchlsit doc to true
        //else change visability for watchlsit doc to false

        if(isOn){
            await watchlistRef.update({
                visability: true
            })
        }
        else{
            await watchlistRef.update({
                visability: false
            })
        }
        

    }  
    return(
        <button 
              onClick={handleClickVisability}
              style={{
                backgroundColor: isOn ? 'orange' : 'green',
                border: '1px solid #ccc',
                borderRadius: '50px',
                padding: '8px 12px',
                fontSize: '16px',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer',
                color: 'white',
              }}
        >{isOn ? "Not Visible To Friend" : "Visible To Friends"}</button>
    )

}

export default ToggleWatchlistVisabilityButton;