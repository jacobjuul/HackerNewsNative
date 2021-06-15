export type UserType = {
  id: string
  karma: number
}

export interface UsersType {
  [id: string]: UserType
}
