import React, { useContext, useState } from 'react'
import { useAuth } from '../../pages/auth/contexts/AuthContext'
import { ChatContext } from '../../pages/auth/contexts/ChatContext';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { database } from '../../firebase';
import { v4 as uuid } from "uuid";

const Inputs = () => {
    const [ text, setText ] = useState('');

    const { currentUser } = useAuth();
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        await updateDoc(doc(database, "chats", data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
            }),
        });

        await updateDoc(doc(database, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(database, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
    };


    return (
        <div>
        <input 
        type='text' 
        placeholder='Type something...' 
        onChange={(e) => setText(e.target.value)}
        value={text}
        />

        <div className='send'>
        <button onClick={handleSend}>Send</button>

        </div>

        </div>
    )
}

export default Inputs
