import React, { useContext, useEffect } from 'react'
import StravaContext from '../../context/strava/stravaContext'
import ProfileContext from '../../context/profile/profileContext'
import StravaOverview from './StravaOverview'

const Strava = () => {
  const stravaContext = useContext(StravaContext)
  const { authenticated, checkAuth, loading, disconnectStrava } = stravaContext

  const profileContext = useContext(ProfileContext)
  const { profile, biometrics } = profileContext

  const stravaURL =
    'https://www.strava.com/oauth/authorize?client_id=47703&redirect_uri=http://localhost:3000/auth/strava/code&response_type=code&scope=activity:read_all,activity:write'

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <div>
      {loading ? null : authenticated ? (
        <>
          <div className='container card card__main--left'>
            <h1>You're integrated bro!</h1>
            <button onClick={disconnectStrava} className='btn'>
              Disconnect Strava
            </button>
          </div>
          <div className='profile profile__top--user'>
            <StravaOverview />
          </div>
        </>
      ) : (
        <div className='container card card__main--left'>
          <a href={stravaURL} className='btn'>
            Click here to integrate
          </a>
        </div>
      )}
    </div>
  )
}

export default Strava
