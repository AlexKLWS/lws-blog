import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { SessionServiceId, ISessionService } from 'services/session'

export function useLoginFacade(): [(username: string, password: string) => Promise<boolean>] {
  const service = useRef(useInjection<ISessionService>(SessionServiceId))
  const login = (username: string, password: string) => {
    return service.current.login(username, password)
  }

  return [login]
}

export function useTokenProvider() {
  const service = useRef(useInjection<ISessionService>(SessionServiceId))

  const getToken = () => {
    return service.current.getToken()
  }

  return {
    isTokenPresent: service.current.isTokenPresent,
    getToken,
  }
}
