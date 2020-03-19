import { injectable } from 'inversify'

import { apiEndpoint } from 'consts/endpoints'
import { setCookie } from 'helpers/cookies'
import { Session } from 'types/session'

export interface IAuthenticationService {
  login: (password: string) => Promise<boolean>
}

@injectable()
export class AuthenticationService implements IAuthenticationService {
  public async login(password: string) {
    const request = {
      method: 'POST',
      body: JSON.stringify({
        password,
      }),
    }

    try {
      const response = await fetch(`${apiEndpoint}/login`, request)
      const session: Session | null = await response.json()
      if (session) {
        setCookie('token', session.token, 1)
        return true
      }
    } catch (e) {
      console.log('ERROR: ', e)
    }
    return false
  }
}

export const AuthenticationServiceId = Symbol('AuthenticationService')
