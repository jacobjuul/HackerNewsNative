import axios, { AxiosResponse } from 'axios'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import {
  FETCH_POSTS,
  SET_POSTS_STATUS,
  FETCH_POSTS_SUCCESS,
} from '../../consts/actionTypes'
import { PostsType } from '../../types/PostTypes'
import { RootState } from '../store'
import { getRandom } from '../../utilities/getRandom'

export const setPostStatus = (status) => ({
  type: SET_POSTS_STATUS,
  payload: status,
})

type PostIdResponse = {
  data: number[]
  status: string
}

export const fetchPosts =
  (ids: number[]) => (dispatch: ThunkDispatch<RootState, {}, AnyAction>) => {
    const random10Ids = getRandom(ids, 10)
    const promises = random10Ids.map((id) =>
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    )

    Promise.all(promises).then((results) => {
      const entities: PostsType = results.reduce((sum, curr) => {
        return {
          ...sum,
          [curr.data.id]: {
            ...curr.data,
            status: curr.status,
          },
        }
      }, {})

      const idsByScore = Object.keys(entities).sort(
        (aId, bId) => entities[+bId].score - entities[+aId].score
      )

      dispatch({ type: FETCH_POSTS_SUCCESS, payload: { entities, idsByScore } })
    })
  }

export const fetchPostIds =
  () => (dispatch: ThunkDispatch<RootState, {}, AnyAction>) => {
    dispatch(setPostStatus('loading'))

    return axios
      .get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then((response: AxiosResponse) => dispatch(fetchPosts(response.data)))
  }
