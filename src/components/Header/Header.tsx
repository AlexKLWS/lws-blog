import React from 'react'
import { useImage } from 'react-image'
import { Link, useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import './Header.scss'
import routes from 'consts/routes'
import { isSmallerScreenQuery } from 'consts/media'

const Header: React.FC = () => {
  const history = useHistory()
  const isSmallerScreen = useMediaQuery({
    query: isSmallerScreenQuery,
  })

  const getLinkStyle = (route: string) => {
    const currentRoute = history.location.pathname
    return route === currentRoute ? 'Sections-item active' : 'Sections-item'
  }

  const { src } = useImage({
    srcList: process.env.PUBLIC_URL + '/square_1.jpg',
    useSuspense: false,
  })

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
          {!isSmallerScreen && (
            <div className='Header-portrait'>
              <img src={src} width='auto' height='100%' alt='' />
            </div>
          )}
        </div>
      </div>
      <nav className='Sections-list'>
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
      </nav>
    </div>
  )
}

export default Header
