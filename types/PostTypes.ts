export type PostType = {
  id: number
  title: string
  by: string
  kids: number[]
  score: number
  url: string
  descendants: number
}

export interface PostsType {
  [id: number]: PostType
}
