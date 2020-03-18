import React from 'react'
import { RouteProps } from 'react-router-dom'

const Editor: React.FC<RouteProps> = (props: RouteProps) => {
  console.log('PROPS: ', props)
  return (
    <div>
      <h1>WOAH AN EDITOR!</h1>
    </div>
  )
}

export default Editor
