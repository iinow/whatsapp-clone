import React, { useState, useContext } from 'react'
import './css/App.css'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { isEmpty } from 'lodash-es'
import { observer } from 'mobx-react-lite'
import { UserStore } from './store'

function App() {
  const userStore = useContext(UserStore)
  const { user } = userStore

  return (
    <div className="app">
      {isEmpty(user) ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/" exact>
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  )
}

export default observer(App)
