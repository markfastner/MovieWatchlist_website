import React, { useState, useEffect, useContext } from "react";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useAuth } from "./auth/contexts/AuthContext";
import { auth, database, db } from "../firebase";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const user = auth.currentUser;
  const userRef = db.users.doc(user.uid);
  const userId = user.uid;


  const handleNewComment = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = (event) => {
    event.preventDefault();
    const newId = comments.length + 1;
    setComments([...comments, { id: newId, content: newComment, replies: [] }]);
    setNewComment('');
  };

  const addReply = (commentId, newReply) => {
    let commentToReply = comments.find((comment) => comment.id === commentId);
    if (commentToReply) {
      const newId = comments.length + 1;
      newReply.id = newId;
      commentToReply.replies.push(newReply);
      setComments([...comments]);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <form className="mb-4" onSubmit={addComment}>
        <textarea className="w-full border rounded p-2" value={newComment} onChange={handleNewComment} placeholder="What's on your mind?" />
        <button className="bg-blue-500 text-white rounded py-2 px-4 mt-4" type="submit">Add Comment</button>
      </form>
      <h2 className="text-2xl font-bold mb-4 flex-center">Ratings Feed</h2>
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} addReply={addReply} />
        ))}
      </ul>
    </div>
  );
};


const Comment = ({ comment, addReply, isNestedReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [newReply, setNewReply] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const user = auth.currentUser;
  const userRef = db.users.doc(user.uid);
  const userId = user.uid;

  const handleNewReply = (event) => {
    setNewReply(event.target.value);
  };

  const handleSubmitReply = (event) => {
    event.preventDefault();

    // add new reply
    addReply(comment.id, { content: newReply, replies: [] });

    // reset reply form
    setShowReplyForm(false);
    setNewReply('');
  };

  const canReply = !isNestedReply;

  const handleLike = () => {
    setLikes(likes+ 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes+ 1);
  };

  return (
    <li key={comment.id} className="bg-white rounded-lg shadow-lg p-4 mb-4">
      <p className="text-gray-800">{comment.content}</p>
      <div>
        <button onClick={handleLike} className="text-gray-600 hover:text-gray-800 focus:outline-none" >{likes}<FaThumbsUp className="h-4 w-4" />
        </button>
        <button onClick={handleDislike} className="text-gray-600 hover:text-gray-800 focus:outline-none">{dislikes}<FaThumbsDown className="h-4 w-4"/>
        </button>
      </div>
      {canReply && (
        <button className="text-gray-600 hover:text-gray-800 font-bold" onClick={() => setShowReplyForm(!showReplyForm)}>Reply</button>
      )}
      {showReplyForm && canReply && (
        <form className="mt-4" onSubmit={handleSubmitReply}>
          <textarea className="w-full border rounded p-2" value={newReply} onChange={handleNewReply} />
          <button className="bg-blue-500 text-white rounded py-2 px-4 mt-4" type="submit">Add Reply</button>
        </form>
      )}
      {comment.replies.length > 0 && (
        <ul className="pl-4">
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} addReply={addReply} isNestedReply={true} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Comments;



