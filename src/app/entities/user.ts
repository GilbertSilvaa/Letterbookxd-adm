type TUserParams = {
  id: number,
  name: string,
  email: string,
  role: 'admin' | 'moderator',
}

export class User {
  id: number
  name: string
  email: string
  role: 'admin' | 'moderator'

  constructor({ id, name, email, role }: TUserParams) {
    this.id = id
    this.name = name
    this.email = email
    this.role = role
  }
}