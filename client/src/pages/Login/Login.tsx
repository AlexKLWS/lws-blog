import React, { useState } from 'react'
import { RouteProps } from 'react-router'

import './Login.scss'
import { useHistory } from 'react-router-dom'

const Login: React.FC<RouteProps> = (props: RouteProps) => {
  const [password, setPassword] = useState('')
  const history = useHistory()

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onLoginPress = () => {
    const request = {
      method: 'POST',
      body: JSON.stringify({
        password,
      }),
    }

    fetch('http://localhost:1323/api/login', request).then((response) => {
      console.log('RESPONSE!!!', response)
      history.push('/secret/editor')
    })
  }

  return (
    <div className='Login-container'>
      <input
        className='Login-password'
        type='password'
        placeholder='password'
        value={password}
        onChange={onInputValueChange}
      />
      <span className='Login-button' onClick={onLoginPress}>
        Log in
      </span>
    </div>
  )
}

export default Login
