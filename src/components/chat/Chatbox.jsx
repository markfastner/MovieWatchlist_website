import React from 'react'
import Messages from './Messages'
import Input from './Inputs.jsx'

const Chatbox = () => {
  return (
    <div className='chatbox'>
        <div className='chatInfo'>
            <span>Jane</span>
            <div className='chatIcons'>
        </div>
            <Messages />
            <Input />
        </div>
      </div>


  )
}

export default Chatbox
