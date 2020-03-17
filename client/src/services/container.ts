import 'reflect-metadata'
import { Container, interfaces, ContainerModule } from 'inversify'
import { AuthenticationService, AuthenticationServiceId, IAuthenticationService } from './authentication'

export const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthenticationService>(AuthenticationServiceId).to(AuthenticationService)
})

export const container = new Container()
