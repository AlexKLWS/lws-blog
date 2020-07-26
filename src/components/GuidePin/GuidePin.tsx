import React from 'react'

import './GuidePin.scss'

import { ReactComponent as MapPin } from 'assets/icons/MapPin.svg'
import { LocationType } from 'types/guide'
import GuideItemIcon from 'components/GuideItemIcon/GuideItemIcon'

type Props = {
  type: LocationType
  lat: number
  lng: number
  onPinPress: () => void
}

const GuidePin: React.FC<Props> = (props: Props) => {
  return (
    <div className={'Guide-pin-container'}>
      <div className={'Guide-pin-icon-container'}>
        <GuideItemIcon type={props.type} />
      </div>
      <MapPin style={{ width: '35px', height: '50px' }} />
      <input
        className={'Guide-pin-button'}
        type={'button'}
        onClick={() => {
          props.onPinPress()
        }}
      />
    </div>
  )
}

export default GuidePin
