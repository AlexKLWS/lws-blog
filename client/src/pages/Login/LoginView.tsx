import React, { useState } from 'react'

import './Login.scss'

interface Props {
  onLoginPress: (password: string) => void
}

const LoginView: React.FC<Props> = (props: Props) => {
  const [password, setPassword] = useState('')

  const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
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
      <span
        className='Login-button'
        onClick={() => {
          props.onLoginPress(password)
        }}
      >
        Log in
      </span>
    </div>
  )
}

export default LoginView
