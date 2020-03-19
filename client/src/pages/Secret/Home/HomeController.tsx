import React from 'react'
import { RouteProps } from 'react-router-dom'

import HomeView from './HomeView'

const HomeController: React.FC<RouteProps> = (props: RouteProps) => {
  const onDropdownPress = () => {}

  return <HomeView />
}

export default HomeController
