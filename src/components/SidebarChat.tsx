import React, { useState, useEffect } from 'react'
import '../css/SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from '../firebase'
import { NewRoom } from '../model/Chat'

interface SidebarChatProps extends React.HTMLProps<any>{
  addNewChat?: boolean
}

const SidebarChat: React.FC<SidebarChatProps> = ({ addNewChat, name }) => {
  const [seed, setSeed] = useState()

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt("Please enter name for chat")

    if(roomName) {
      const room: NewRoom = {
        name: roomName
      }
      db.collection('rooms').add(room)
    }
  }

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/gridy/${seed}.svg`}/>
      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>Last message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  )
}

export default SidebarChat
