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
        <img src="https://images.vexels.com/media/users/3/182439/isolated/preview/08300579bcd67e90f8ac86cc95352a3b-boho-arrow-by-vexels.png" alt="" />
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
