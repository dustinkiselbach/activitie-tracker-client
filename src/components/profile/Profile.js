import React, { useContext, useEffect } from 'react'
import ProfileUser from './ProfileUser'
import ProfileActivitiesSummary from './ProfileActivitesSummary'

import ProfileContext from '../../context/profile/profileContext'
import ActivitiesContext from '../../context/activities/activitiesContext'
import ProfileOverview from './ProfileOverview'

const Profile = ({ match }) => {
  const profileContext = useContext(ProfileContext)
  const { profile, getProfile, getUserProfile, imperialToggle } = profileContext

  const activitiesContext = useContext(ActivitiesContext)
  const { activities } = activitiesContext

  useEffect(() => {
    // if params get profile by id
    if (Object.keys(match.params).length > 0) {
      getProfile(match.params.id)
    } else {
      // get profile by state id
      getProfile(profile.id)
    }
  }, [])

  return (
    <section className='profile'>
      <div className='profile__top'>
        <div className='profile__top--user'>
          <ProfileUser profile={profile} />
        </div>
        <div className='profile__top--activities-summary'>
          <ProfileActivitiesSummary activities={activities} />
        </div>
      </div>
      <div className='profile__metrics'>
        <ProfileOverview profile={profile} imperialToggle={imperialToggle} />
      </div>
    </section>
  )
}

export default Profile
