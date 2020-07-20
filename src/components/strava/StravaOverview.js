import React, { useContext } from 'react'
import ProfileContext from '../../context/profile/profileContext'

const StravaOverview = () => {
  const profileContext = useContext(ProfileContext)
  const { profile } = profileContext

  return <div>Will include stuff here eventually</div>
}

export default StravaOverview
