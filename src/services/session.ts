import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'
import jwt_decode from 'jwt-decode'

import { apiEndpoint } from 'consts/endpoints'
import { getCookie, setCookie } from 'helpers/cookies'
import { Session, Token } from 'types/session'

const TOKEN_COOKIE_KEY = 'token'

export interface ISessionService {
  isTokenPresent: boolean
  getToken: () => string
  addOnManualUpdateCallback: (callback: () => void) => void
  login: (username: string, password: string) => Promise<boolean>
}

@injectable()
export class SessionService implements ISessionService {
  private readonly _manualUpdateCallbacks: Array<() => void> = []

  public get isTokenPresent() {
    return !!getCookie(TOKEN_COOKIE_KEY)
  }

  public getToken() {
    return getCookie(TOKEN_COOKIE_KEY)
  }

  public addOnManualUpdateCallback(callback: () => void) {
    this._manualUpdateCallbacks.push(callback)
  }

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
      const session: Session = response.data
      const decoded = jwt_decode<Token>(session.access_token)
      setCookie(TOKEN_COOKIE_KEY, session.access_token, decoded.exp)
      console.log()
      this._manualUpdateCallbacks.forEach((callback) => {
        callback()
      })
      return true
    } catch (e) {
      console.log('ERROR: ', e)
    }
    return false
  }
}

export const SessionServiceId = Symbol('SessionService')
