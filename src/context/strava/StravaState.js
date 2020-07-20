import React, { useReducer } from 'react'
import axios from 'axios'
import stravaReducer from './stravaReducer'
import StravaContext from './stravaContext'
import { CHECK_AUTH, SET_LOADING, DISCONNECT_STRAVA } from '../types'

const StravaState = (props) => {
  const initialState = {
    authenticated: false,
    loading: false,
  }

  const [state, dispatch] = useReducer(stravaReducer, initialState)

  // Set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  // integrate with strava
  const connectStrava = async (token, history) => {
    try {
      const res = await axios.post(
        `https://agile-retreat-42559.herokuapp.com/api/v1/auth?scope=read,activity:read_all,read_all&code=${token}`
      )
      // delayed to appear like its doing something and pushing
      setTimeout(() => {
        history.push('/dashboard')
      }, 1000)
      console.log(res)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // check if authentication is valid
  const checkAuth = async () => {
    setLoading()

    try {
      const res = await axios.get(
        'https://agile-retreat-42559.herokuapp.com/api/v1/auth'
      )
      console.log(res)
      dispatch({ type: CHECK_AUTH })
    } catch (err) {
      console.log(err.response.data)
      throw err
    }
  }

  // disconnect strava
  const disconnectStrava = () => {
    setLoading()

    setTimeout(() => {
      dispatch({ type: DISCONNECT_STRAVA })
    }, 1000)
  }

  return (
    <StravaContext.Provider
      value={{
        authenticated: state.authenticated,
        loading: state.loading,
        connectStrava,
        disconnectStrava,
        checkAuth,
      }}
    >
      {props.children}
    </StravaContext.Provider>
  )
}

export default StravaState
