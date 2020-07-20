import React, { useReducer } from 'react'
import axios from 'axios'
import ActivitiesContext from './activitiesContext'
import activitiesReducer from './activitiesReducer'
import { weekParser } from '../../utils/weekParser'
import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_FOR_CALENDAR,
  GET_ACTIVITIES_PAGINATION,
  GET_ACTIVITY,
  SET_LOADING,
  PARSE_ACTIVITY_RUN_METRIC,
  PARSE_ACTIVITY_RUN_IMPERIAL,
  PARSE_ACTIVITY_RIDE_METRIC,
  PARSE_ACTIVITY_RIDE_IMPERIAL,
} from '../types'

const ActivitiesState = (props) => {
  const initialState = {
    activities: [],
    pagination: {},
    activity: null,
    activitiesForCalendar: null,
    activityParsed: false,
    loading: false,
  }

  const [state, dispatch] = useReducer(activitiesReducer, initialState)

  // Get all acitivities associated with logged in user
  const getActivities = async (page) => {
    // if lazy loading don't want loading icon every time
    if (page === 1) {
      setLoading()
    }

    try {
      const res = await axios.get(
        `https://agile-retreat-42559.herokuapp.com//api/v1/activities?page=${page}`
      )
      dispatch({ type: GET_ACTIVITIES, payload: res.data.activities })
      dispatch({
        type: GET_ACTIVITIES_PAGINATION,
        payload: res.data.pagination,
      })
      console.log(res)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // get activity by activity id
  const getActivity = async (id) => {
    try {
      const res = await axios.get(
        `https://agile-retreat-42559.herokuapp.com//api/v1/activities/${id}`
      )
      dispatch({ type: GET_ACTIVITY, payload: res.data })
      console.log(res)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // Get all activities associated with logged in user
  const getActivitiesByDate = async (year, unit) => {
    setLoading()

    try {
      const res = await axios.get(
        `https://agile-retreat-42559.herokuapp.com//api/v1/activities?start_date=${year}-01-01&end_date=${
          year + 1
        }-01-01`
      )

      console.log(res)
      const parsed = weekParser(res.data.activities, year, unit)
      dispatch({
        type: GET_ACTIVITIES_FOR_CALENDAR,
        payload: parsed,
      })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  // Sync activities
  const syncActivities = async () => {
    try {
      const res = await axios.post(
        'https://agile-retreat-42559.herokuapp.com//api/v1/activities'
      )
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  // intergrate with strava
  const integrateStrava = async (token, history) => {
    try {
      const res = await axios.post(
        `https://agile-retreat-42559.herokuapp.com//api/v1/auth?scope=read,activity:read_all,read_all&code=${token}`
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

  // parse data from metric into imperial
  const parseActivity = (activity, imperialToggle) => {
    console.log(activity.activity.activity_type, imperialToggle)
    // Default
    if (activity.activity.activity_type === 'Run') {
      if (!imperialToggle) {
        dispatch({ type: PARSE_ACTIVITY_RUN_METRIC })
      } else {
        dispatch({ type: PARSE_ACTIVITY_RUN_IMPERIAL })
      }
    } else {
      if (!imperialToggle) {
        dispatch({ type: PARSE_ACTIVITY_RIDE_METRIC })
      } else {
        dispatch({ type: PARSE_ACTIVITY_RIDE_IMPERIAL })
      }
    }
  }
  // Set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING })
  }

  return (
    <ActivitiesContext.Provider
      value={{
        activities: state.activities,
        pagination: state.pagination,
        activity: state.activity,
        activitiesForCalendar: state.activitiesForCalendar,
        activityParsed: state.activityParsed,
        loading: state.loading,
        getActivities,
        getActivity,
        getActivitiesByDate,
        parseActivity,
        syncActivities,
        integrateStrava,
      }}
    >
      {props.children}
    </ActivitiesContext.Provider>
  )
}

export default ActivitiesState
