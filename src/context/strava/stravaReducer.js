import { CHECK_AUTH, SET_LOADING, DISCONNECT_STRAVA } from '../types'

export default (state, action) => {
  switch (action.type) {
    case CHECK_AUTH:
      return {
        ...state,
        authenticated: true,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case DISCONNECT_STRAVA:
      return {
        ...state,
        authenticated: false,
        loading: false,
      }
    default:
      return state
  }
}
