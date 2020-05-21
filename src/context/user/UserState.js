import React, { useReducer, useEffect, useContext } from 'react'
import UserContext from './userContext'
import userReducer from './userReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import AlertContext from '../../context/alert/alertContext'

import { SET_CURRENT_USER, USER_ERROR, CLEAR_ERROR } from '../types'

const UserState = props => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    errors: {}
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const alertContext = useContext(AlertContext)

  const { setAlert } = alertContext

  // onrerender check if user is logged in
  useEffect(() => {
    // Check for token
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken)
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.jwtToken)
      // Set user and isAuthenticated
      setCurrentUser(decoded)

      // Check for expired token
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        // Logout user / test
        logoutUser()
        // Clear current Profile
        // TODO store.dispatch(clearCurrentProfile())
        // Redirect to login
        window.location.href = '/login'
      }
    }
  }, [])

  // Register User
  const registerUser = async (user, history) => {
    try {
      await axios.post('https://agile-retreat-42559.herokuapp.com//users', user)
      history.push(`/confirm-email/${user.email}`)
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data.error
      })
    }
  }

  // Login User
  const loginUser = async userData => {
    try {
      const res = await axios.post(
        'https://agile-retreat-42559.herokuapp.com//users/sign_in',
        userData
      )
      // Get token out of headers
      const { authorization } = res.headers

      // Set token to ls
      localStorage.setItem('jwtToken', authorization)
      // Set token to Autu header
      setAuthToken(authorization)
      // Decode token to get user data
      const decoded = jwt_decode(authorization)

      console.log(res.data)
      // Set Current user
      setCurrentUser(decoded)
      setAlert('Logged in')
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data.error
      })
    }
  }
  // Set logged in user
  const setCurrentUser = decoded => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    })
  }

  // send password reset email
  const sendResetEmail = async email => {
    try {
      const res = await axios.post(
        'https://agile-retreat-42559.herokuapp.com//users/password',
        { email }
      )
      console.log(res)
      setAlert('An email has been sent with a token to reset your password')
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data.error
      })
    }
  }

  // reset password with token
  const finalResetPassword = async newPassword => {
    try {
      const res = await axios.put(
        'https://agile-retreat-42559.herokuapp.com//users/password',
        newPassword
      )
      console.log(res)
      setAlert('Your password has been reset')
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response.data.error
      })
    }
  }

  // resend account confirmation email
  const resendConfirmation = async email => {
    try {
      await axios.post(
        'https://agile-retreat-42559.herokuapp.com//users/confirmation',
        { email }
      )
      setAlert('Email has been resent')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // Confirm User account via email
  const confirmAccount = async confirmation_token => {
    console.log(confirmation_token)
    try {
      const res = await axios.get(
        `https://agile-retreat-42559.herokuapp.com//users/confirmation?confirmation_token=${confirmation_token}`
      )
      console.log(res)
      setAlert('Your account has been activated')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // Log user out
  const logoutUser = () => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future request
    setAuthToken(false)
    // Set current user to {} which will set isAuthenticatred to false
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    })
    setAlert('You have been logged out')
  }

  // clear error
  const clearError = errorType => {
    dispatch({
      type: CLEAR_ERROR,
      payload: errorType
    })
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        errors: state.errors,
        registerUser,
        loginUser,
        logoutUser,
        confirmAccount,
        sendResetEmail,
        finalResetPassword,
        resendConfirmation,
        clearError
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
