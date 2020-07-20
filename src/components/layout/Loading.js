import React, { useContext } from 'react'
import Spinner from '../common/Spinner'
import ActivitiesContext from '../../context/activities/activitiesContext'
import UserContext from '../../context/user/userContext'
import StravaContext from '../../context/strava/stravaContext'

const Loading = () => {
  const activitiesContext = useContext(ActivitiesContext)
  const userContext = useContext(UserContext)
  const stravaContext = useContext(StravaContext)

  return (
    <>
      {activitiesContext.loading ||
      userContext.authenticating ||
      stravaContext.loading ? (
        <div className='loading-overlay'>
          <Spinner />
        </div>
      ) : null}
    </>
  )
}

export default Loading
