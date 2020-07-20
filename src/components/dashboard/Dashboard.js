import React, { useState, useEffect, useContext } from 'react'
import ActivitiesContext from '../../context/activities/activitiesContext'
import UserContext from '../../context/user/userContext'
import ProfileContext from '../../context/profile/profileContext'

import DashboardActivities from './DashboardActivities'
import DashboardSidebar from './DashboardSidebar'
import Toggler from '../common/Toggler'

import { useInView } from 'react-intersection-observer'

const stravaURL =
  'https://www.strava.com/oauth/authorize?client_id=47703&redirect_uri=http://localhost:3000/auth/strava/code&response_type=code&scope=activity:read_all,activity:write'

const Dashboard = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '400px 0px',
  })

  const [pages, setPages] = useState([1])

  const activitiesContext = useContext(ActivitiesContext)
  const {
    activities,
    pagination,
    syncActivities,
    getActivities,
    loading,
  } = activitiesContext

  const userContext = useContext(UserContext)
  const { user } = userContext

  const profileContext = useContext(ProfileContext)
  const {
    profile,
    getProfile,
    changeUnitPreference,
    imperialToggle,
  } = profileContext

  useEffect(() => {
    // have to set headers before stuff is fetched
    if (!userContext.loading && activities.length === 0) {
      syncActivities()
      getProfile(user.sub)
      getActivities(1)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.loading])

  // if ref is in view add another item to array

  useEffect(() => {
    if (inView && pages.slice(-1)[0] !== pagination.total_pages) {
      setPages([...pages, pages.slice(-1)[0] + 1])
    }
  }, [inView])

  //  get the page based on last item of array
  //  boolean checking to make sure the pages
  //  stay in sync with the api calls

  useEffect(() => {
    if (inView && pages.length > activities.length) {
      getActivities(pages.slice(-1)[0])
    }
  }, [pages])

  return (
    <>
      {/* TODO make sure this shit will work this won't work when a new user joins*/}
      {Object.keys(pagination).length > 0 && (
        <section className='dashboard'>
          {loading ? null : pagination.total > 0 ? (
            // there are activities
            <>
              <div className='sidebar'>
                <div className='sidebar__top'>
                  <h3>{!imperialToggle ? 'Metric' : 'Imperial'}</h3>
                  <Toggler
                    onClick={(e) => {
                      e.preventDefault()

                      changeUnitPreference()
                    }}
                    toggle={imperialToggle}
                  />
                </div>
                {profile && (
                  <DashboardSidebar
                    activities={activities[0]}
                    profile={profile}
                    imperialToggle={imperialToggle}
                  />
                )}
              </div>
              <div className='activities'>
                {pages.map((page, index) => (
                  <React.Fragment key={index}>
                    {activities[index] && (
                      <>
                        <DashboardActivities
                          activities={activities[index]}
                          imperialToggle={imperialToggle}
                        />
                        {/* TEST */}
                        <div ref={ref} />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : (
            // there are no activities
            <div className='container card card__main--left'>
              You have no activities, please integrate
              <a href={stravaURL} className='btn'>
                Integrate
              </a>
            </div>
          )}
        </section>
      )}
    </>
  )
}

export default Dashboard
