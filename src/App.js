import React from 'react'
import './main.css'

import Navbar from './components/layout/Navbar'
import Alerts from './components/layout/Alerts'
import Loading from './components/layout/Loading'
import LandingPage from './components/pages/LandingPage'
import FormPage from './components/pages/FormPage'
import IntegrationAuth from './components/pages/IntegrationAuth'
import Strava from './components/strava/Strava'
import Dashboard from './components/dashboard/Dashboard'
import Activity from './components/activity/Activity'
import Profile from './components/profile/Profile'

import UserState from './context/user/UserState'
import AlertState from './context/alert/AlertState'
import ProfileState from './context/profile/ProfileState'
import ActivitiesState from './context/activities/ActivitiesState'
import StravaState from './context/strava/StravaState'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './components/common/PrivateRoute'
import Settings from './components/settings/Settings'
import CalendarPage from './components/pages/CalendarPage'

function App() {
  return (
    <AlertState>
      <UserState>
        <ProfileState>
          <ActivitiesState>
            <StravaState>
              <Router>
                <Navbar />
                <Alerts />
                <Loading />
                <Switch>
                  <Route path='/' exact component={LandingPage} />
                  <Route
                    path='/login'
                    render={(props) => <FormPage login={true} {...props} />}
                  />
                  <Route
                    path='/register'
                    render={(props) => <FormPage register={true} {...props} />}
                  />
                  <Route
                    path='/reset-password/:token'
                    render={(props) => (
                      <FormPage resetPassword={true} {...props} />
                    )}
                  />
                  <Route
                    path='/reset-password/'
                    render={(props) => (
                      <FormPage resetPassword={true} {...props} />
                    )}
                  />
                  <Route
                    path='/confirm-email/:email'
                    render={(props) => (
                      <FormPage confirmEmail={true} {...props} />
                    )}
                  />
                  <Route
                    path='/auth/:provider/:token'
                    component={IntegrationAuth}
                  />
                  <Route path='/strava' component={Strava} />

                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <PrivateRoute
                    exact
                    path='/calendar'
                    component={CalendarPage}
                  />
                  <PrivateRoute
                    exact
                    path='/calendar/:year'
                    component={CalendarPage}
                  />
                  <PrivateRoute exact path='/settings' component={Settings} />
                  <PrivateRoute exact path='/profile' component={Profile} />
                  <PrivateRoute exact path='/profile/:id' component={Profile} />
                  <PrivateRoute
                    exact
                    path='/activity/:id,:unit'
                    component={Activity}
                  />
                </Switch>
              </Router>
            </StravaState>
          </ActivitiesState>
        </ProfileState>
      </UserState>
    </AlertState>
  )
}

export default App
