import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.scss'
import routes from 'consts/routes'

const Footer: React.FC = () => {
  return (
    <div className='Footer-container'>
      <nav className='Footer-links-container'>
        <Link to={routes.home} className='Footer-item'>
          Home
        </Link>
        <Link to={routes.life} className='Footer-item'>
          Life
        </Link>
        <Link to={routes.code} className='Footer-item'>
          Code
        </Link>
        <Link to={routes.guides} className='Footer-item'>
          Guides
        </Link>
        <Link to={routes.projects} className='Footer-item'>
          Projects
        </Link>
        <Link to={routes.contact} className='Footer-item'>
          Contact
        </Link>
      </nav>
      <span className='Footer-copyright-name'>&copy; Alex Korzh</span>
    </div>
  )
}

export default Footer
