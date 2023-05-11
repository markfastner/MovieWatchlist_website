import React, { useEffect, useState, useRef } from "react";
import { auth, db, database } from "../firebase.js";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import {Card} from "react-bootstrap";

// const SetBiography = () => {
//     const [biography, setBiography] = useState("");
//     const currentUser = auth.currentUser;

//     const handleChange = async (e) => {
//         setBiography(e.target.value);
//         const biographyRef = doc(collection(database, "biography"), currentUser.uid);
//         await setDoc(biographyRef, { biography: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Biography saved:", biography);
//     };

//     return(
//         <div>
//             <Card className="bg-white shadow-lg dark:bg-slate-700 dark:text-white rounded-md p-5 gap-1 mx-10 my-10 max-w-screen">
//             Biography
//                 <form action="/action_page.php">
//                 {/* <input
//                     className="flex flex-col border border-gray-300 p-2 rounded-md mb-4 w-full md:w-11/12 lg:w-11/12"
//                     placeholder="Type your message..." 
//                     value={biography}
//                     onChange={(e) => setBiography(e.target.value)}
//                 /> */}
                
//                     <textarea value={biography} onChange={handleChange} rows="100" cols="100" className="resize-full max-w-full w-full h-32 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-800 dark:bg-slate-700 dark:text-white dark:border-slate-400" placeholder="Enter your biography here..."></textarea>
//                 </form>
//                 <button 
//                     type="submit"  
//                     onClick={handleSubmit}
//                     className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
//                 >
//                     Send
//                 </button>
//             </Card>
//         </div>
//     );

// };

// export default SetBiography;

const BiographyForm = () => {
    const [bio, setBio] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const docRef = await addDoc(collection(database, "biography"), {
        biography: bio,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    };

    return (
    <form onSubmit={handleSubmit}>
        <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Write your biography here..."
        rows="4"
        defaultValue={bio}
        ></textarea>
        <button type="submit">Save Biography</button>
    </form>
    );
};

export default BiographyForm;
