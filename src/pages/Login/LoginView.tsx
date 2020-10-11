import React, { useState } from 'react'

import './Login.scss'

interface Props {
  onLoginPress: (username: string, password: string) => void
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

  return (
    <div className='Login-container'>
      <input className='Login-input' placeholder='username' value={username} onChange={onUsernameInputValueChange} />
      <input
        className='Login-input'
        type='password'
        placeholder='password'
        value={password}
        onChange={onPasswordInputValueChange}
      />
      <input
        className='App-button'
        onClick={() => {
          props.onLoginPress(username, password)
        }}
        type='submit'
        value='Log in'
      />
    </div>
  )
}

export default LoginView
