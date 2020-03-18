import React, { useState } from 'react'
import { RouteProps } from 'react-router'
import { useHistory } from 'react-router-dom'

import LoginView from './LoginView'
import { useLoginFacade } from 'services/facades/loginFacade'

const LoginController: React.FC<RouteProps> = (props: RouteProps) => {
  const history = useHistory()

  const [password, setPassword] = useState('')
  const [login] = useLoginFacade()

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = async () => {
    try {
      const isLoginSuccessful = await login(password)
    } catch (e) {}
  }

  return (
    <LoginView
      password={password}
      onInputValueChange={onInputValueChange}
      onLoginPress={() => {
        handleLogin()
      }}
    />
  )
}

export default LoginController
