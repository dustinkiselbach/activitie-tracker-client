import React, { useState, useContext, useEffect } from 'react'
import SettingsNav from './SettingsNav'
import SettingsProfile from './SettingsProfile'
import ProfileContext from '../../context/profile/profileContext'
import SettingsDisplay from './SettingsDisplay'
import SettingsAccount from './SettingsAccount'

const navItems = [
  {
    title: 'My Profile',
    id: 'profile',
  },
  {
    title: 'My Account',
    id: 'account',
  },
  {
    title: 'Display Preferences',
    id: 'display',
  },
]

const Settings = () => {
  const [selected, setSelected] = useState('profile')

  const profileContext = useContext(ProfileContext)

  const {
    profile,
    biometrics,
    getUserProfile,
    updateProfile,
    getBiometrics,
    setBiometrics,
  } = profileContext
  // can only update name, email weight height
  // const updatableProfile = {
  //   weight: profile.weight,
  //   height: profile.height
  // }

  useEffect(() => {
    getUserProfile()
    getBiometrics()
  }, [])

  let updatableProfile

  if (biometrics) {
    updatableProfile = {
      weight: biometrics[0].weight,
      height: biometrics[0].height,
    }
  }

  return (
    <>
      {biometrics && (
        <section className='settings'>
          <SettingsNav
            navItems={navItems}
            setSelected={setSelected}
            selected={selected}
          />
          <div className='settings-main'>
            {selected === 'profile' && (
              <SettingsProfile
                profile={updatableProfile}
                updateProfile={setBiometrics}
                id={profile.id}
              />
            )}
            {selected === 'account' && (
              <SettingsAccount profile={updatableProfile} />
            )}
            {selected === 'display' && <SettingsDisplay />}
          </div>
        </section>
      )}
    </>
  )
}

export default Settings
