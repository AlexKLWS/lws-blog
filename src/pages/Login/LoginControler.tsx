import React from 'react'
import { useHistory } from 'react-router-dom'

import LoginView from './LoginView'
import { useLoginFacade } from 'facades/sessionFacade'
import routes from 'consts/routes'
import { deleteAllCookies } from 'helpers/cookies'

const LoginController: React.FC = () => {
  const [login] = useLoginFacade()
  const history = useHistory()

  const handleLogin = async (username: string, password: string) => {
    const loginSuccessful = await login(username, password)
    if (loginSuccessful) {
      history.push(routes.secret.home)
    }
  }

  const onClearCookiesPress = () => {
    deleteAllCookies()
  }

  return (
    <LoginView
      onLoginPress={(username: string, password: string) => {
        handleLogin(username, password)
      }}
      onClearCookiesPress={onClearCookiesPress}
    />
  )
}

export default LoginController
