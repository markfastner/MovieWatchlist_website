import React, { useEffect, useState, useRef } from "react";
import { auth, db, database } from "../firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
  const [message, setMessage] = useState("");

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(database, "messages"), {
        text: message,
        timestamp: serverTimestamp(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form className="persistent">
      <input
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
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


