import React, { useState } from "react";
import { auth, database } from "../firebase.js";
import { addDoc, collection, serverTimestamp, doc } from "firebase/firestore";

const SendRatingReply = ({originalRating}) => {
  const [rating, setRating] = useState("");
  const currentUser = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(database, "ratings", doc(originalRating)), {
        text: rating,
        uid: currentUser.uid,
        timestamp: serverTimestamp(),
      });
      setRating("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
      <form className="mb-4" onSubmit={SendRatingReply}>
        <textarea className="w-full border rounded p-2" /*value={newComment} onChange={handleNewComment}*/ placeholder="What's on your mind?" 
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
        <button onClick={handleSubmit} className="bg-blue-500 text-white rounded py-2 px-4 mt-4" type="submit">Add Reply</button>
      </form>

  );
};

export default SendRatingReply;


