import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import './Header.scss'

const Header: React.FC = () => {
  let history = useHistory()

  const onTitlePress = () => {
    history.push('/')
  }

  return (
    <div className='Header-container'>
      <div className='Header-top-container'>
        <h1 onClick={onTitlePress} className='Header-title'>
          LONG WINTER SHADOWS
        </h1>
        <div className='Header-right-container'>
          <span className='Header-subtitle'>Personal blog by Alex Korzh</span>
          <div className='Header-portrait' />
        </div>
      </div>
      <div className='Sections-list'>
        <Link to='/life'>LIFE</Link>
        <Link to='/code'>CODE</Link>
        <Link to='/guides'>GUIDES</Link>
        <Link to='/projects'>PROJECTS</Link>
      </div>
    </div>
  )
}

export default Header
