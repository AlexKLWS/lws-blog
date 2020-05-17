import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import LoginView from './LoginView'
import { useLoginFacade } from 'facades/loginFacade'
import routes from 'consts/routes'

const LoginController: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [login] = useLoginFacade()

  const handleLogin = async (password: string) => {
    const loginSuccessful = await login(password)
    if (loginSuccessful) {
      props.history.push(routes.secret.home)
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
