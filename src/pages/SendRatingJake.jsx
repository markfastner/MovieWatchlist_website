import React, { useState } from "react";
import { auth, db, database } from "../firebase.js";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = () => {
  const [message, setMessage] = useState("");

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
    <form className="send-message">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
};

export default SendMessage;



