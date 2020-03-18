import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { AuthenticationServiceId, IAuthenticationService } from 'services/authentication'

export function useLoginFacade(): [(password: string) => Promise<boolean>] {
  const service = useRef(useInjection<IAuthenticationService>(AuthenticationServiceId))
  const login = (password: string) => {
    return service.current.login(password)
  }

  return [login]
}
