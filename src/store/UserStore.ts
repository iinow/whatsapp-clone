import { createContext } from 'react'
import { observable, action, computed } from 'mobx'
import { UserInfo as User } from 'firebase'

class UserStore {
  @observable user?: User

  @action.bound setUser(user: User | null) {
    if (user) {
      this.user = user
    }
  }

  @computed get info(): User | null {
    if (this.user) {
      return this.user
    }
    return null
  }
}

export default createContext(new UserStore())
