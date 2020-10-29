import React from 'react'

import { LocationType } from 'types/guide'

import { default as cafe } from 'assets/icons/Cafe.svg'
import { default as bar } from 'assets/icons/Bar.svg'
import { default as restaurant } from 'assets/icons/Restaurant.svg'
import { default as genericIcon } from 'assets/icons/Generic.svg'

const GuideItemIcon = ({ type, styleOverride }: { type: LocationType; styleOverride?: React.CSSProperties }) => {
  switch (type) {
    case LocationType.BAR:
      return <img src={bar} style={styleOverride || pinIconStyle} />
    case LocationType.CAFE:
      return <img src={cafe} style={styleOverride || pinIconStyle} />
    case LocationType.RESTAURANT:
      return <img src={restaurant} style={styleOverride || pinIconStyle} />
    default:
      return <img src={genericIcon} style={styleOverride || pinIconStyle} />
  }
}

const pinIconStyle = { width: '20px', height: '20px' }

export default GuideItemIcon
