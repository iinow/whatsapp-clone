import React, { useContext } from 'react'
import '../css/Login.css'
import { Button } from '@material-ui/core'
import { auth, provider } from '../firebase'
import { from } from 'rxjs'
import { observer } from 'mobx-react-lite'
import { UserStore } from '../store'

const Login: React.FC = () => {
  const userStore = useContext(UserStore)
  const { setUser } = userStore

  const signIn = () => {
    from(auth.signInWithPopup(provider))
      .pipe()
      .subscribe(data => {
        setUser(data.user)
      })
  }

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png" alt="" />
        <div className="login__text">
          <h1>WhatsApp Clone</h1>
        </div>

        <Button type="submit" onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  )
}

export default observer(Login)
