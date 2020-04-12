import 'reflect-metadata'
import { Container, interfaces, ContainerModule } from 'inversify'
import { AuthenticationService, AuthenticationServiceId, IAuthenticationService } from './authentication'
import { MaterailPostService, ArticlePostServiceId, IMaterialPostService } from './materialPost'
import { FileUploadService, IFileUploadService, FileUploadServiceId } from './fileUpload'

export const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthenticationService>(AuthenticationServiceId).to(AuthenticationService)
  bind<IMaterialPostService>(ArticlePostServiceId).to(MaterailPostService)
  bind<IFileUploadService>(FileUploadServiceId).to(FileUploadService)
})

export const container = new Container()
