// Import Firestore database
import db from './firebase';
import { useState } from 'react';

const Read = () => {

    const [info , setInfo] = useState([]);

    // Start the fetch operation as soon as
    // the page loads
    window.addEventListener('load', () => {
        Fetchdata();
    });

    // Fetch the required data using the get() method
    const Fetchdata = ()=>{
        db.collection('friends').get().then((querySnapshot) => {

            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr , data]);

            });
        })
    }

    // Display the result on the page
    return (
        <div>
            <center>
            <h2>Friend Details</h2>
            </center>

        {
            info.map((data) => (
            <Frame firstName={data.firstName}
                lastName={data.lastName}
                username={data.username}/>
            ))
        }
        </div>

    );
}

// Define how each display entry will be structured
const Frame = ({firstName , lastName , username}) => {
    console.log(firstName + " " + lastName + ", " + username);
    return (
        <center>
            <div className="div">

<p>NAME : {[firstName, lastName]}</p>

<p>Username : {username}</p>

            </div>
        </center>
    );
}

export default Read;