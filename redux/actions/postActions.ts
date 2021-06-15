import * as axios from 'axios'
import {
  FETCH_POSTS,
  SET_POSTS_STATUS,
  FETCH_POSTS_SUCCESS,
} from '../../consts/actionTypes'
import { getRandom } from '../../utilities/getRandom'

export const setPostStatus = (status) => ({
  type: SET_POSTS_STATUS,
  payload: status,
})

type PostIdResponse = {
  data: number[]
  status: string
}

export const fetchPosts = (ids: number[]) => (dispatch) => {
  const random10Ids = getRandom(ids, 10)
  const promises = random10Ids.map((id) =>
    axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  )

  Promise.all(promises).then((results) => {
    const entities = results.reduce((sum, curr) => {
      return {
        ...sum,
        [curr.data.id]: {
          ...curr.data,
          status: curr.status,
        },
      }
    }, {})

    const idsByScore = Object.keys(entities).sort(
      (aId, bId) => entities[bId].score - entities[aId].score
    )

    dispatch({ type: FETCH_POSTS_SUCCESS, payload: { entities, idsByScore } })
  })
}

export const fetchPostIds = () => (dispatch) => {
  dispatch(setPostStatus('loading'))

  return axios
    .get('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then((response: PostIdResponse) => dispatch(fetchPosts(response.data)))
}
