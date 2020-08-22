import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon as InsertEmoticonIcon,
  Mic as MicIcon
} from '@material-ui/icons'
import db from '../firebase'

const Chat: React.FC = () => {
  const [seed, setSeed] = useState()
  const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
    if(roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data()?.name)
      ))
    }
  }, [roomId])

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('You typed >>> ', input)
    setInput('')
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/gridy/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at .. . ..</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className={`chat__message ${true && 'chat__receiver'}`}>
          <span className="chat__name">Sunny ha</span>
          안녕...
          <span className="chat__timestamp">3:52pm</span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={onChangeInput}
            placeholder="Type a message"
            type="text"
          />
          <button type="submit" onClick={sendMessage}>
            Send a Message{' '}
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat
