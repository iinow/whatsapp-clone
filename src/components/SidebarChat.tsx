import React, { useState, useEffect } from 'react'
import '../css/SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from '../firebase'
import { NewRoom } from '../model/Chat'
import { Link } from 'react-router-dom'

interface SidebarChatProps extends React.HTMLProps<any> {
  addNewChat?: boolean
}

const SidebarChat: React.FC<SidebarChatProps> = ({ addNewChat, name, id }) => {
  const [seed, setSeed] = useState()

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt('Please enter name for chat')

    if (roomName) {
      const room: NewRoom = {
        name: roomName
      }
      db.collection('rooms').add(room)
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/gridy/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>방 만들기</h2>
    </div>
  )
}

export default SidebarChat
