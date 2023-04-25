import React, { useContext, useEffect, useRef } from 'react'
import { useAuth } from '../../pages/auth/contexts/AuthContext'
import { ChatContext } from '../../pages/auth/contexts/ChatContext';

const Message = ({ message }) => {

    const { currentUser } = useAuth();
    const { data } = useContext(ChatContext);

    const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
        
  return (
    <div ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
        <div className='messageInfo'>
            <span>Just now</span>
        </div>
        <div className='messageContent'>
            <p>{message.text}</p>
        </div>
    </div>
  )
}

export default Message
