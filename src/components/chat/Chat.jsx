import React from 'react'
import Sidebar from './Sidebar.jsx'
import Chatbox from './Chatbox.jsx'

const Chat = () => {
  return (
    <div className="home">
     <div className="container">
      <Sidebar/>
      <Chatbox/>
      </div>
      </div>
  )
}

export default Chat
