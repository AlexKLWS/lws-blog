import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { apiEndpoint } from 'consts/endpoints'
import { setCookie } from 'helpers/cookies'
import { Session } from 'types/session'

export interface IAuthenticationService {
  login: (username: string, password: string) => Promise<boolean>
}

@injectable()
export class AuthenticationService implements IAuthenticationService {
  public async login(username: string, password: string) {
    const data = new FormData()
    data.append('username', username)
    data.append('password', password)

    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${apiEndpoint}/login`,
      data,
    }

    try {
      const response = await axios(request)
      const session: Session | null = await response.data
      if (session) {
        setCookie('token', session.access_token, 1)
        return true
      }
    } catch (e) {
      console.log('ERROR: ', e)
    }
    return false
  }
}

export const AuthenticationServiceId = Symbol('AuthenticationService')
