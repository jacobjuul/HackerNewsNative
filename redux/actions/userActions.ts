import axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../store'
import { FETCH_USER, FETCH_USER_SUCCESS } from '../../consts/actionTypes'

export const fetchUser =
  (id: string) => (dispatch: ThunkDispatch<RootState, {}, AnyAction>) => {
    dispatch({ type: FETCH_USER })
    axios
      .get(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
      .then(({ data }) => {
        dispatch({ type: FETCH_USER_SUCCESS, payload: data })
      })
  }
