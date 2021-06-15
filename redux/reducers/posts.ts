import { PayloadAction } from 'redux'
import { PostType } from '../../types/PostTypes'
import { SET_POSTS_STATUS, FETCH_POSTS_SUCCESS } from '../../consts/actionTypes'

interface PostsState<T> {
  entities: { [id: number]: T }
  idsByScore: number[]
  status: 'initial' | 'loading' | 'succeeded' | 'failed'
}

const initialState: PostsState<PostType> = {
  entities: {},
  idsByScore: [],
  status: 'initial',
}

export function posts(state = initialState, action) {
  switch (action.type) {
    case SET_POSTS_STATUS: {
      return {
        ...state,
        status: action.payload,
      }
    }

    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        status: 'succeeded',
        entities: action.payload.entities,
        idsByScore: action.payload.idsByScore,
      }
    }

    default: {
      return state
    }
  }
}
