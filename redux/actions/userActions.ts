import axios from 'axios'
import { FETCH_USER, FETCH_USER_SUCCESS } from '../../consts/actionTypes'

export const fetchUser = (id: string) => (dispatch) => {
  dispatch({ type: FETCH_USER })
  axios
    .get(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
    .then(({ data }) => {
      dispatch({ type: FETCH_USER_SUCCESS, payload: data })
    })
}
