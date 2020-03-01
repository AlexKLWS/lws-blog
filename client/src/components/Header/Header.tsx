import React from 'react'
import Img from 'react-image'
import { Link, useHistory } from 'react-router-dom'

import './Header.scss'
import routes from 'consts/routes'

const Header: React.FC = () => {
  const history = useHistory()

  const getLinkStyle = (route: string) => {
    const currentRoute = history.location.pathname
    return route === currentRoute ? 'Sections-item active' : 'Sections-item'
  }

  return (
    <div className='Header-container'>
      <div className='Header-top-container'>
        <Link to={routes.home} className='Header-title'>
          LONG WINTER SHADOWS
        </Link>
        <div className='Header-right-container'>
          <span className='Header-subtitle'>Personal blog by</span>
          <Link to={routes.contact} className='Header-subtitle link'>
            Alex Korzh
          </Link>
          <div className='Header-portrait'>
            <Img src={process.env.PUBLIC_URL + '/square_1.jpg'} width='auto' height='100%' />
          </div>
        </div>
      </div>
      <div className='Sections-list'>
        <Link to={routes.life} className={getLinkStyle(routes.life)}>
          Life
        </Link>
        <Link to={routes.code} className={getLinkStyle(routes.code)}>
          Code
        </Link>
        <Link to={routes.guides} className={getLinkStyle(routes.guides)}>
          Guides
        </Link>
        <Link to={routes.projects} className={getLinkStyle(routes.projects)}>
          Projects
        </Link>
      </div>
    </div>
  )
}

export default Header
