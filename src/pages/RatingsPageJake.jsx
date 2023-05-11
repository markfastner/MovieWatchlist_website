import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import SendMessage from "./SendMessage";
import { db } from "../firebase.js";

const Ratings = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const ratingsRef = db.ratings;
    const q = query(ratingsRef, ("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRatings(fetchedMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {ratings.map((message, index) => (
        <div key={index}>
          <p>{message.text}</p>
        </div>
      ))}
      <SendMessage />
    </div>
  );
};

export default Ratings;



