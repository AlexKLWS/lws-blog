import React, { useState } from 'react'
import { RouteProps } from 'react-router'
import { useHistory } from 'react-router-dom'

import './Login.scss'
import { useLoginFacade } from 'services/facades/loginFacade'

const Login: React.FC<RouteProps> = (props: RouteProps) => {
  const history = useHistory()

  const [password, setPassword] = useState('')
  const [login] = useLoginFacade()

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onLoginPress = () => {
    login(password).then((response) => {
      console.log('RESPONSE!!!', response)
      // history.push('/secret/editor')
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
