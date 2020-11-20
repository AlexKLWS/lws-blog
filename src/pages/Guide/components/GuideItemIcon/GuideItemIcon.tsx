import React from 'react'

import { LocationType } from 'types/guide'

import { default as cafe } from 'assets/icons/Cafe.svg'
import { default as bar } from 'assets/icons/Bar.svg'
import { default as restaurant } from 'assets/icons/Restaurant.svg'
import { default as genericIcon } from 'assets/icons/Generic.svg'

const GuideItemIcon = ({ type, styleOverride }: { type: LocationType; styleOverride?: React.CSSProperties }) => {
  switch (type) {
    case LocationType.BAR:
      return <img src={bar} style={styleOverride || pinIconStyle} alt='Bar' />
    case LocationType.CAFE:
      return <img src={cafe} style={styleOverride || pinIconStyle} alt='Cafe' />
    case LocationType.RESTAURANT:
      return <img src={restaurant} style={styleOverride || pinIconStyle} alt='Restaurant' />
    default:
      return <img src={genericIcon} style={styleOverride || pinIconStyle} alt='' />
  }
}

const pinIconStyle = { width: '20px', height: '20px' }

export default GuideItemIcon
