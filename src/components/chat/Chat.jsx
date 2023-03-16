import React, { useState, useEffect } from "react";
import { db } from '../../firebase';

const Chat = ({ user }) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const unsubscribe = db
            .users
            .doc(user.uid)
            .collection("friends")
            .onSnapshot((snapshot) => {
                const friendsList = snapshot.docs.map((doc) => doc.data().friend);
                setFriends(friendsList);
            });
        return unsubscribe;
    }, [user]);

    useEffect(() => {
        if (selectedFriend) {
            const unsubscribe = db
                .users
                .doc(user.uid)
                .collection("friends")
                .doc(selectedFriend)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    const messagesList = snapshot.docs.map((doc) => doc.data());
                    setMessages(messagesList);
                });
            return unsubscribe;
        }
    }, [user, selectedFriend]);

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            db.users
                .doc(user.uid)
                .collection("friends")
                .doc(selectedFriend)
                .collection("messages")
                .add({
                    message: newMessage.trim(),
                    sender: user.displayName,
                    timestamp: db.FieldValue.serverTimestamp(),
                });
            setNewMessage("");
        }
    };

    return (
        <>
        <h2>Friends:</h2>
        <ul>
        {friends.map((friend) => (
            <li key={friend} onClick={() => setSelectedFriend(friend)}>
            {friend}
            </li>
        ))}
        </ul>
        {selectedFriend && (
            <>
            <h2>Chat with {selectedFriend}:</h2>
            <ul>
            {messages.map((message) => (
                <li key={message.timestamp}>
                <strong>{message.sender}: </strong>
                {message.message}
                </li>
            ))}
            </ul>
            <div>
            <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
            </div>
            </>
        )}
        </>
    );
};

export default Chat;

