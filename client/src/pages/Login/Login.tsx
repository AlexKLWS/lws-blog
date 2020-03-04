import React from 'react'
import { RouteProps } from 'react-router'

import './Login.scss'

const Login: React.FC<RouteProps> = (props: RouteProps) => {
  return (
    <div className='Login-container'>
      <input className='Login-password' type='password' placeholder='password' />
      <span className='Login-button'>Log in</span>
    </div>
  )
}

export default Login
