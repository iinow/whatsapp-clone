import React from 'react'
import '../css/Sidebar.css'
import { Avatar, IconButton } from '@material-ui/core'
import {
  DonutLarge as DonutLargeIcon,
  Chat as ChatIcon,
  MoreVert as MoreVertIcon,
  SearchOutlined
} from '@material-ui/icons'
import SidebarChat from "./SidebarChat";

const Sidebar: React.FC = () => {
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
          <SearchOutlined/>
          <input placeholder="Search or start new chat" type="text"/>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat/>
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  )
}

export default Sidebar
