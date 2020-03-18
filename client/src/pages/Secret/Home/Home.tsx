import React from 'react'
import { RouteProps } from 'react-router-dom'

const Home: React.FC<RouteProps> = (props: RouteProps) => {
  console.log('PROPS: ', props)
  return (
    <div>
      <h1>SECRET HOME!</h1>
    </div>
  )
}

export default Home
