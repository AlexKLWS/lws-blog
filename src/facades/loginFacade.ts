import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { AuthenticationServiceId, IAuthenticationService } from 'services/authentication'

export function useLoginFacade(): [(username: string, password: string) => Promise<boolean>] {
  const service = useRef(useInjection<IAuthenticationService>(AuthenticationServiceId))
  const login = (username: string, password: string) => {
    return service.current.login(username, password)
  }

  return [login]
}
