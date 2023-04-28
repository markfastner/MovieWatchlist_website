import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Inputs.jsx'
import { ChatContext } from '../../pages/auth/contexts/ChatContext'

const Chatbox = () => {
    const { data } = useContext(ChatContext);
  return (
    <div className='chatbox'>
        <div className='chatInfo'>
            <span>{data.user.displayName}</span>
            <div className='chatIcons'>
        </div>
            <Messages />
            <Input />
        </div>
      </div>


  )
}

export default Chatbox
