import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import SendMessage from "./SendMessage";
import { db, database } from "../firebase.js";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = db.messages;
    const q = query(messagesRef, ("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.text}</p>
        </div>
      ))}
      <SendMessage />
    </div>
  );
};

export default Chat;


