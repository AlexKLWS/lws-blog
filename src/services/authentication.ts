import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { authEndpoint } from 'consts/endpoints'
import { setCookie } from 'helpers/cookies'
import { Session } from 'types/session'

export interface IAuthenticationService {
  login: (password: string) => Promise<boolean>
}

@injectable()
export class AuthenticationService implements IAuthenticationService {
  public async login(password: string) {
    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${authEndpoint}/login`,
      data: {
        password,
      },
    }

    try {
      const response = await axios(request)
      const session: Session | null = await response.data
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
