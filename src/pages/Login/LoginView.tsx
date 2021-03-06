import React, { useState } from 'react'

import './Login.scss'

interface Props {
  onLoginPress: (username: string, password: string) => void
  onClearCookiesPress: () => void
}

const LoginView: React.FC<Props> = (props: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const onPasswordInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      props.onLoginPress(username, password)
    }
  }

  return (
    <div className='Login-container'>
      <input className='Login-input' placeholder='username' value={username} onChange={onUsernameInputValueChange} />
      <input
        className='Login-input'
        type='password'
        placeholder='password'
        value={password}
        onChange={onPasswordInputValueChange}
        onKeyDown={onKeyDown}
      />
      <input
        className='App-button'
        onClick={() => {
          props.onLoginPress(username, password)
        }}
        type='submit'
        value='Log in'
      />
      <p className='Login-GDPR-info'>
        I've made this login page just for myself, so I don't expect anyone else to use it. Still, I'm providing this
        notice just in case. This website is using <a href='https://en.wikipedia.org/wiki/HTTP_cookie'>cookies</a> to
        store a <a href='https://jwt.io/introduction/'>JWT token</a> used to authenticate the user. The token is stored
        for 24 hours only. By logging in you consent to store this token on your device. If you had logged in previously
        and would like to remove the token cookie, press the button below.
      </p>
      <input className='App-button' onClick={props.onClearCookiesPress} type='submit' value='Clear Cookies' />
    </div>
  )
}

export default LoginView
