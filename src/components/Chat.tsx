import React, { useEffect, useState, useContext } from 'react'
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
import { Message } from '../model/Chat'
import firebase from 'firebase'
import { observer } from 'mobx-react-lite'
import { UserStore } from '../store'

const Chat: React.FC = () => {
  const [seed, setSeed] = useState()
  const [input, setInput] = useState('')
  const { roomId } = useParams()
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState(new Array<Message>())
  const userStore = useContext(UserStore)
  const { user } = userStore

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot(snapshot => setRoomName(snapshot.data()?.name))

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('createdAt', 'asc')
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
  }, [roomId])

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .add({
        name: user?.displayName,
        message: input,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    setInput('')
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const getDateString = (seconds?: number) => {
    if(!seconds) {
      return ''
    }
    return new Date(seconds * 1000).toUTCString()
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/gridy/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            {
              getDateString(messages[messages.length - 1]?.createdAt?.seconds)
            }
          </p>
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
        {messages.map((message, index) => (
          <p
            className={`chat__message ${message.name === user?.displayName && 'chat__receiver'}`}
            key={index}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {getDateString(message?.createdAt?.seconds)}
            </span>
          </p>
        ))}
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

export default observer(Chat)
