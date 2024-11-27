type TUserParams = {
  id: number,
  name: string,
  nickname: string,
  email: string,
  privilege: 'ADM' | 'moderator',
}

export class User {
  id: number
  name: string
  nickname: string
  email: string
  privilege: 'ADM' | 'moderator'

  constructor({ id, name, nickname, email, privilege }: TUserParams) {
    this.id = id
    this.name = name
    this.email = email
    this.nickname = nickname
    this.privilege = privilege
  }
}