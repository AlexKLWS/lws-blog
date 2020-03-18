import React, { useState } from 'react'
import { RouteProps } from 'react-router'
import { useHistory } from 'react-router-dom'

import LoginView from './LoginView'
import { useLoginFacade } from 'services/facades/loginFacade'
import routes from 'consts/routes'

const LoginController: React.FC<RouteProps> = (props: RouteProps) => {
  const history = useHistory()

  const [password, setPassword] = useState('')
  const [login] = useLoginFacade()

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = async () => {
    const loginSuccessful = await login(password)
    if (loginSuccessful) {
      history.push(routes.secret.home)
    }
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
