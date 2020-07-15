import React from 'react'

import './GuidePin.scss'

import { ReactComponent as MapPin } from 'assets/icons/MapPin.svg'
import { ReactComponent as Cafe } from 'assets/icons/Cafe.svg'
import { ReactComponent as Bar } from 'assets/icons/Bar.svg'
import { ReactComponent as Restaurant } from 'assets/icons/Restaurant.svg'
import { ReactComponent as GenericIcon } from 'assets/icons/Generic.svg'
import { PinType, GuidePinData } from 'types/guide'

const GuidePin: React.FC<GuidePinData> = (props: GuidePinData) => {
  const pinIconStyle = { width: '20px', height: '20px' }

  const getPinIcon = () => {
    switch (props.type) {
      case PinType.BAR:
        return <Bar style={pinIconStyle} />
      case PinType.CAFE:
        return <Cafe style={pinIconStyle} />
      case PinType.RESTAURANT:
        return <Restaurant style={pinIconStyle} />
      default:
        return <GenericIcon style={pinIconStyle} />
    }
  }

  return (
    <div className={'Guide-pin-container'}>
      <div className={'Guide-pin-icon-container'}>{getPinIcon()}</div>
      <MapPin style={{ width: '50px', height: '50px' }} />
    </div>
  )
}

export default GuidePin
