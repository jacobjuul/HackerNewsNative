export type TPost = {
  id: number
  title: string
  by: string
  kids: number[]
  score: number
  url: string
  descendants: number
  time: number
}

export interface IPosts {
  [id: number]: TPost
}

export type TStatus = 'initial' | 'loading' | 'succeeded' | 'failed'
