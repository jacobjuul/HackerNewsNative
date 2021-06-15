import { TUser } from '../../types/UserTypes'
import { TStatus } from '../../types/PostTypes'
import { FETCH_USER, FETCH_USER_SUCCESS } from '../../consts/actionTypes'

interface IUsersState<T> {
  entities: { [id: number]: T }
  status: TStatus
}

const initialState: IUsersState<TUser> = {
  entities: {},
  status: 'initial',
}

type UsersAction = {
  type: string
  payload: TUser
}

export function users(state = initialState, action: UsersAction) {
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
