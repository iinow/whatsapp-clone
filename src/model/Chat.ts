export interface Room {
  id: string
  data: {
    name: string
  }
}

export interface NewRoom {
  name: string
}

export interface Message {
  name: string
  message: string
  createdAt: {
    seconds: number,
    nanoseconds: number
  }
}
