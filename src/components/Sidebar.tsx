import React, { useState, useEffect } from 'react'
import '../css/Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import {
  DonutLarge as DonutLargeIcon,
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  SearchOutlined
} from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import db from '../firebase'
import { Room } from '../model/Chat'

const Sidebar: React.FC = () => {
  const [rooms, setRooms] = useState(new Array<Room>())

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot =>
      setRooms(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: {
            name: doc.data().name
          }
        }))
      )
    )

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {
          rooms.map(room => (
            <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
          ))
        }
      </div>
    </div>
  )
}

export default Sidebar
