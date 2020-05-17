import React, { useState } from 'react'
import { RouteProps } from 'react-router'
import { useHistory } from 'react-router-dom'

import LoginView from './LoginView'
import { useLoginFacade } from 'facades/loginFacade'
import routes from 'consts/routes'

const LoginController: React.FC<RouteProps> = (props: RouteProps) => {
  const history = useHistory()
  const [login] = useLoginFacade()

  const handleLogin = async (password: string) => {
    const loginSuccessful = await login(password)
    if (loginSuccessful) {
      history.push(routes.secret.home)
    }
  }

  return (
    <LoginView
      onLoginPress={(password: string) => {
        handleLogin(password)
      }}
    />
  )
}

export default LoginController
