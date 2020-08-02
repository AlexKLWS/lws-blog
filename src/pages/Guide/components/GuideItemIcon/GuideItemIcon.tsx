import React from 'react'

import { LocationType } from 'types/guide'

import { ReactComponent as Cafe } from 'assets/icons/Cafe.svg'
import { ReactComponent as Bar } from 'assets/icons/Bar.svg'
import { ReactComponent as Restaurant } from 'assets/icons/Restaurant.svg'
import { ReactComponent as GenericIcon } from 'assets/icons/Generic.svg'

const GuideItemIcon = ({ type, styleOverride }: { type: LocationType; styleOverride?: React.CSSProperties }) => {
  switch (type) {
    case LocationType.BAR:
      return <Bar style={styleOverride || pinIconStyle} />
    case LocationType.CAFE:
      return <Cafe style={styleOverride || pinIconStyle} />
    case LocationType.RESTAURANT:
      return <Restaurant style={styleOverride || pinIconStyle} />
    default:
      return <GenericIcon style={styleOverride || pinIconStyle} />
  }
}

const pinIconStyle = { width: '20px', height: '20px' }

export default GuideItemIcon