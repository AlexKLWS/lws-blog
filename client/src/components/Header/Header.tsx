import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const Header: React.FC = () => {
  return (
    <div className='Header-container'>
      <div className='Header-top-container'>
        <h1 className='Header-title'>LONG WINTER SHADOWS</h1>
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
