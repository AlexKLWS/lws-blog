import 'reflect-metadata'
import { Container, interfaces, ContainerModule } from 'inversify'
import { AuthenticationService, AuthenticationServiceId, IAuthenticationService } from './authentication'
import { MaterailPostService, MaterialPostServiceId, IMaterialPostService } from './materialPost'
import { FileUploadService, IFileUploadService, FileUploadServiceId } from './fileUpload'
import { IMaterialFetchService, MaterialFetchServiceId, MaterailFetchService } from './materialPreviewsFetch'
import { IArticleFetchService, ArticleFetchServiceId, ArticleFetchService } from './articleFetch'
import { IExtMaterialFetchService, PageFetchServiceId, ExtMaterialFetchService } from './extMaterialFetchService'
import { IMaterialDataService, MaterialDataServiceId, MaterialDataService } from './materialData'

export const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthenticationService>(AuthenticationServiceId).to(AuthenticationService)
  bind<IMaterialPostService>(MaterialPostServiceId).to(MaterailPostService)
  bind<IFileUploadService>(FileUploadServiceId).to(FileUploadService)
  bind<IMaterialFetchService>(MaterialFetchServiceId).to(MaterailFetchService)
  bind<IArticleFetchService>(ArticleFetchServiceId).to(ArticleFetchService)
  bind<IExtMaterialFetchService>(PageFetchServiceId).to(ExtMaterialFetchService)
  bind<IMaterialDataService>(MaterialDataServiceId).to(MaterialDataService)
})

export const container = new Container()
