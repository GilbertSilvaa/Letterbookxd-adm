type TUserParams = {
  id: number,
  name: string,
  nickname: string,
  email: string,
  privilege: 'ADM' | 'moderator',
  status: 'ACTIVE' | 'INACTIVE'
}

export class User {
  id: number
  name: string
  nickname: string
  email: string
  privilege: 'ADM' | 'moderator'
  status: 'ACTIVE' | 'INACTIVE'

  constructor({ id, name, nickname, email, privilege, status }: TUserParams) {
    this.id = id
    this.name = name
    this.email = email
    this.nickname = nickname
    this.privilege = privilege
    this.status = status
  }
}