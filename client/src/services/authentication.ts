import { injectable } from 'inversify'

import { apiEndpoint } from 'consts/endpoints'

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
      console.log('RESPONSE: ', response)
      return response.status === 200
    } catch (e) {
      console.log('ERROR: ', e)
      return false
    }
  }
}

export const AuthenticationServiceId = Symbol('AuthenticationService')
