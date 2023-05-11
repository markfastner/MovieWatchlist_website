import React, { useEffect, useState, useRef } from "react";
import { auth, database, db } from "../firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
  const [message, setMessage] = useState("");
    const [username, setUsername] = useState(null);
    const currentUser = auth.currentUser; 

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    });

    const queryUsername = async () => {
        const userDocRef = db.users.doc(currentUser.uid);

        const userDocSnapshot = await userDocRef.get();
        const username = userDocSnapshot.get('username');
        console.log(username);
        setUsername(username);
    } 

  const handleSubmit = async (e) => {
      queryUsername();
    e.preventDefault();
    try {
      await addDoc(collection(database, "messages"), {
        text: message,
        username: username,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form className="flex flex-col items-center pt-6">
      <input
        className="flex flex-col border border-gray-300 p-2 rounded-md mb-4 w-full md:w-11/12 lg:w-11/12"
        placeholder="Type your message..." 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button 
        type="submit"  
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      >
        Send
      </button>
    </form>
  );
};

export default SendMessage;


