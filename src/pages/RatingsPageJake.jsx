import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import SendRating from "./SendRating";
import { database } from "../firebase.js";

const Ratings = () => {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const ratingsRef = collection(database, "ratings");
    const q = query(ratingsRef, orderBy("timestamp") );
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
    <div className="flex flex-col overflow-y-auto h-64 rounded-sm px-10 py-5 dark:text-white">
      {ratings.map((rating, index) => (
        <div key={index}>
          <p>{rating.text}</p>
        </div>
      ))}
      <SendRating />
    </div>
  );
};

export default Ratings;

