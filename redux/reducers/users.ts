import { UserType } from '../../types/UserTypes'
import { FETCH_USER, FETCH_USER_SUCCESS } from '../../consts/actionTypes'

interface UsersState<T> {
  entities: { [id: number]: T }
  status: 'initial' | 'loading' | 'succeeded' | 'failed'
}

const initialState: UsersState<UserType> = {
  entities: {},
  status: 'initial',
}

export function users(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER: {
      return {
        ...state,
        status: 'loading',
      }
    }

    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        status: 'succeeded',
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload,
        },
      }
    }

    default: {
      return state
    }
  }
}
