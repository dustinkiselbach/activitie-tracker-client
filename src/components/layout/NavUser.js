import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const transition = {
  duration: 0.2,
  ease: [0.6, 0.05, -0.01, 0.9],
}

const variants = {
  hidden: {
    opacity: 0,
    y: -50,
    transition,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
}

const NavUser = ({ logoutUser }) => {
  return (
    <motion.ul
      className='sublist'
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={variants}
    >
      <li className='sublist--item'>
        <NavLink to='/profile'>My Profile</NavLink>
      </li>
      <li className='sublist--item'>
        <NavLink to='/settings'>Settings</NavLink>
      </li>
      <li className='sublist--item'>
        <NavLink to='/login' onClick={logoutUser}>
          Logout
        </NavLink>
      </li>
      <li className='sublist--item'>
        <NavLink to='/strava'>Strava</NavLink>
      </li>
    </motion.ul>
  )
}

export default NavUser
