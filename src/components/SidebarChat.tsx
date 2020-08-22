import React, { useState, useEffect } from 'react'
import '../css/SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from '../firebase'
import { Message, NewRoom } from '../model/Chat'
import { Link } from 'react-router-dom'

interface SidebarChatProps extends React.HTMLProps<any> {
  addNewChat?: boolean
}

const SidebarChat: React.FC<SidebarChatProps> = ({ addNewChat, name, id }) => {
  const [seed, setSeed] = useState()
  const [messages, setMessages] = useState(new Array<Message>())

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))

    if (id) {
      db.collection('rooms')
        .doc(id)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot =>
          setMessages(
            snapshot.docs.map(doc => ({
              name: doc.data().name,
              message: doc.data().message,
              createdAt: doc.data().createdAt
            }))
          )
        )
    }
  }, [id])

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
          <p>{messages[0]?.message}</p>
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
