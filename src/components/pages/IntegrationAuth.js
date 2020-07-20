import React, { useEffect, useContext } from 'react'
import ActivitiesContext from '../../context/activities/activitiesContext'
import UserContext from '../../context/user/userContext'
import StravaContext from '../../context/strava/stravaContext'

const IntegrationAuth = ({ location, history }) => {
  const activitiesContext = useContext(ActivitiesContext)
  const userContext = useContext(UserContext)
  const stravaContext = useContext(StravaContext)

  const qs = new URLSearchParams(location.search)

  useEffect(() => {
    if (userContext.isAuthenticated) {
      stravaContext.connectStrava(qs.get('code'), history)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.isAuthenticated])
  return <div></div>
}

export default IntegrationAuth
