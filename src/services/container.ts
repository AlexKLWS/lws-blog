import 'reflect-metadata'
import { Container, interfaces, ContainerModule } from 'inversify'
import { AuthenticationService, AuthenticationServiceId, IAuthenticationService } from './authentication'
import { ArticlePostService, ArticlePostServiceId, IArticlePostService } from './articlePost'

export const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthenticationService>(AuthenticationServiceId).to(AuthenticationService)
  bind<IArticlePostService>(ArticlePostServiceId).to(ArticlePostService)
})

export const container = new Container()
