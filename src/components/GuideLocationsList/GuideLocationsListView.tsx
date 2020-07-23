import React, { useState } from 'react'
import { Transition } from 'react-transition-group'
import { ReactComponent as Arrow } from 'assets/icons/Arrow.svg'

import './GuideLocationsList.scss'

import { GuideLocationInfo } from 'types/guide'
import GuideItemIcon from 'components/GuideItemIcon/GuideItemIcon'

type Props = {
  isDisabled: boolean
  guideInfo: string
  locations: GuideLocationInfo[]
  locationsListIsOpen: boolean
  setLocationsListIsOpen: (value: boolean) => void
  onLocationClick: (location: GuideLocationInfo) => void
}

const GuideLocationsListView: React.FC<Props> = (props: Props) => {
  const buttonStateStyle = () => {
    return props.locationsListIsOpen ? 'hamburger hamburger--spin is-active' : 'hamburger hamburger--spin'
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

  const transitionStylesOpacity: any = {
    entering: { opacity: 1, transitionDelay: '0.4s' },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }

  const displayScrollIndicator = props.locations.length >= 6

  return (
    <Transition in={props.locationsListIsOpen} timeout={300}>
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
                  props.setLocationsListIsOpen(!props.locationsListIsOpen)
                }}
                disabled={props.isDisabled}
              >
                <span className='hamburger-box'>
                  <span className='hamburger-inner'></span>
                </span>
              </button>
            </div>
          </div>
          <div className={'Guide-info-location-list-container'} style={{ ...transitionStylesOpacity[state] }}>
            <p className={'Guide-info-note'}>{props.guideInfo}</p>
            <div className={'Guide-info-location-list'}>
              {props.locations.map((location, index) => {
                return (
                  <div
                    key={`${index}`}
                    className='Guide-info-location-list-item'
                    onClick={() => {
                      props.setLocationsListIsOpen(false)
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
          <div className={'Guide-info-bottom-container'}>
            <div className={'Guide-info-bottom-container-center'}>
              {displayScrollIndicator && (
                <Arrow
                  style={{
                    transform: 'rotate(270deg)',
                    transition: 'all 0.2s ease-in-out',
                    ...transitionStylesOpacity[state],
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default GuideLocationsListView
