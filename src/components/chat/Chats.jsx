import React, { useContext, useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { database } from '../../firebase'
import { useAuth } from '../../pages/auth/contexts/AuthContext'
import { ChatContext } from '../../pages/auth/contexts/ChatContext'

const Chats = () => {

    const { currentUser } = useAuth();
    const { dispatch } = useContext(ChatContext);

    const [chats, setChats] = useState([])
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(database, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats()
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload: u})
    }

    return (
    <div className="chats">
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className='userChat' key={chat[0]} onClick={handleSelect(chat[1].userInfo)}>
            <img src='' alt=''/>
            <div className='userChatInfo'>
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
      </div>
        </div>
        ))}
      </div>
  )
}

export default Chats
