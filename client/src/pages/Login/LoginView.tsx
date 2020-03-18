import React from 'react'

import './Login.scss'

interface Props {
  password: string
  onInputValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onLoginPress: () => void
}

const LoginView: React.FC<Props> = (props: Props) => {
  return (
    <div className='Login-container'>
      <input
        className='Login-password'
        type='password'
        placeholder='password'
        value={props.password}
        onChange={props.onInputValueChange}
      />
      <span className='Login-button' onClick={props.onLoginPress}>
        Log in
      </span>
    </div>
  )
}

export default LoginView
