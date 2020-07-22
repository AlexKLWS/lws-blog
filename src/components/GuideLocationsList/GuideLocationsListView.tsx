import React, { useState } from 'react'
import { Transition } from 'react-transition-group'

import './GuideLocationsList.scss'

import { GuideLocationInfo } from 'types/guide'
import GuideItemIcon from 'components/GuideItemIcon/GuideItemIcon'

type Props = {
  isDisabled: boolean
  guideInfo: string
  locations: GuideLocationInfo[]
  onLocationClick: (location: GuideLocationInfo) => void
}

const GuideLocationsListView: React.FC<Props> = (props: Props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const buttonStateStyle = () => {
    return menuIsOpen ? 'hamburger hamburger--spin is-active' : 'hamburger hamburger--spin'
  }

  const buttonBackgroundStyle = () => {
    return props.isDisabled ? 'Guide-info-container is-disabled' : 'Guide-info-container'
  }

  const transitionStyles: any = {
    entering: { width: '420px', height: '520px' },
    entered: { width: '420px', height: '520px' },
    exiting: { width: '40px', height: '40px', transitionDelay: '0.1s' },
    exited: { width: '40px', height: '40px' },
  }

  const transitionStylesMenu: any = {
    entering: { opacity: 1, transitionDelay: '0.4s' },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }

  return (
    <Transition in={menuIsOpen} timeout={300}>
      {(state) => (
        <div className={buttonBackgroundStyle()} style={{ ...transitionStyles[state] }}>
          <div className={'Guide-info-button-container'}>
            <div className={'Guide-info-button'}>
              <button
                className={buttonStateStyle()}
                type='button'
                aria-label='Menu'
                aria-controls='navigation'
                onClick={() => {
                  setMenuIsOpen(!menuIsOpen)
                }}
                disabled={props.isDisabled}
              >
                <span className='hamburger-box'>
                  <span className='hamburger-inner'></span>
                </span>
              </button>
            </div>
          </div>
          <div className={'Guide-info-location-list-container'} style={{ ...transitionStylesMenu[state] }}>
            <p className={'Guide-info-note'}>{props.guideInfo}</p>
            <div className={'Guide-info-location-list'}>
              {props.locations.map((location, index) => {
                return (
                  <div
                    key={`${index}`}
                    className='Guide-info-location-list-item'
                    onClick={() => {
                      setMenuIsOpen(false)
                      props.onLocationClick(location)
                    }}
                  >
                    <GuideItemIcon type={location.type} />
                    <h3 className='Guide-info-location-list-item-label'>{location.title}</h3>
                  </div>
                )
              })}
              {props.locations.map((location, index) => {
                return (
                  <div
                    key={`${index + 4}`}
                    className='Guide-info-location-list-item'
                    onClick={() => {
                      setMenuIsOpen(false)
                      props.onLocationClick(location)
                    }}
                  >
                    <GuideItemIcon type={location.type} />
                    <h3 className='Guide-info-location-list-item-label'>{location.title}</h3>
                  </div>
                )
              })}
              {props.locations.map((location, index) => {
                return (
                  <div
                    key={`${index + 8}`}
                    className='Guide-info-location-list-item'
                    onClick={() => {
                      setMenuIsOpen(false)
                      props.onLocationClick(location)
                    }}
                  >
                    <GuideItemIcon type={location.type} />
                    <h3 className='Guide-info-location-list-item-label'>{location.title}</h3>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default GuideLocationsListView
