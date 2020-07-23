import React from 'react'
import { Transition } from 'react-transition-group'
import { useImage } from 'react-image'

import './GuideLocationInfo.scss'

import { GuideLocationInfo } from 'types/guide'

const DURATION = 300

type Props = {
  isShown: boolean
  locationInfo: GuideLocationInfo
  onCloseClick: () => void
}

const GuideLocationInfoView: React.FC<Props> = (props: Props) => {
  const { src } = useImage({
    srcList: props.locationInfo.imageUrl,
    useSuspense: false,
  })

  const defaultStyle = {
    transition: `${DURATION}ms ease-in-out`,
    opacity: 0,
    transform: 'scale(0.95)',
  }

  const transitionStyles: any = {
    entering: { opacity: 1, transform: 'scale(1)', pointerEvents: 'all' },
    entered: { opacity: 1, transform: 'scale(1)', pointerEvents: 'all' },
    exiting: { opacity: 0, transform: 'scale(0.95)', pointerEvents: 'none' },
    exited: { opacity: 0, transform: 'scale(0.95)', pointerEvents: 'none' },
  }

  return (
    <Transition in={props.isShown} timeout={DURATION} unmountOnExit>
      {(state) => (
        <div
          className={'Guide-location-info'}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {props.isShown ? (
            <div className={'Guide-close-button-container'}>
              <div className={'Guide-close-button'}>
                <button
                  className={'hamburger hamburger--spin is-active'}
                  type='button'
                  onClick={() => {
                    props.onCloseClick()
                  }}
                >
                  <span className='hamburger-box'>
                    <span className='hamburger-inner'></span>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ height: '40px' }} />
          )}
          <div className='Guide-location-info-contents'>
            <img src={src} className='Guide-location-info-photo' />
            <div className='Guide-location-info-text-container'>
              <h2 className='Guide-location-info-title'>{props.locationInfo.title}</h2>
              <p className='Guide-location-info-description'>{props.locationInfo.description}</p>
              <span className='Guide-location-info-address'>{props.locationInfo.address}</span>
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default GuideLocationInfoView
