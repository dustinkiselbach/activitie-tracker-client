import React, { useReducer, useEffect } from 'react'
import ProfileContext from './profileContext'
import axios from 'axios'
import profileReducer from './profileReducer'
import { GET_PROFILE, CHANGE_UNIT_PREFERENCE, GET_BIOMETRICS } from '../types'

const ProfileState = (props) => {
  const initialState = {
    profile: null,
    biometrics: null,
    imperialToggle: false,
  }

  const [state, dispatch] = useReducer(profileReducer, initialState)

  // Checking if localstorage set for imperial or not
  useEffect(() => {
    if (localStorage.getItem('imperial') === 'true') {
      changeUnitPreference()
    }
  }, [])

  // get profile
  const getUserProfile = async () => {
    try {
      const res = await axios.get(
        'https://agile-retreat-42559.herokuapp.com/api/v1/users'
      )
      dispatch({ type: GET_PROFILE, payload: res.data })
      console.log(res)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  // get profile
  const getProfile = async (id) => {
    try {
      const res = await axios.get(
        `https://agile-retreat-42559.herokuapp.com/api/v1/users/${id}`
      )
      dispatch({ type: GET_PROFILE, payload: res.data })
      console.log(res)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // update profile
  const updateProfile = async (id, data) => {
    try {
      const res = await axios.patch(
        `https://agile-retreat-42559.herokuapp.com//api/v1/users/${id}`,
        data
      )
      dispatch({ type: GET_PROFILE, payload: res.data })
      console.log(res)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // get all biometrics
  const getBiometrics = async () => {
    try {
      const res = await axios.get(
        'https://agile-retreat-42559.herokuapp.com//api/v1/profiles/'
      )

      console.log(res)
      dispatch({ type: GET_BIOMETRICS, payload: res.data.profiles })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // get weight tracking
  const setBiometrics = async (data = { weight: 176, height: 176 }) => {
    try {
      const res = await axios.post(
        'https://agile-retreat-42559.herokuapp.com//api/v1/profiles/',
        data
      )

      console.log(res)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // change unit preference
  const changeUnitPreference = () => {
    localStorage.setItem('imperial', !state.imperialToggle)
    dispatch({ type: CHANGE_UNIT_PREFERENCE })
  }

  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        biometrics: state.biometrics,
        imperialToggle: state.imperialToggle,
        getUserProfile,
        getProfile,
        getBiometrics,
        setBiometrics,
        updateProfile,
        changeUnitPreference,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileState
