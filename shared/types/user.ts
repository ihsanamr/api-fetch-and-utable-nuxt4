export interface DummyUser {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
}

export interface DummyUsersResponse {
  users: DummyUser[]
  total: number
}

export interface User {
  id: number
  fullName: string
  email: string
  age: number
}

export interface UsersResponse {
  users: User[]
  total: number
}
