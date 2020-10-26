import 'reflect-metadata'
import { Container, interfaces, ContainerModule } from 'inversify'
import { AuthenticationService, AuthenticationServiceId, IAuthenticationService } from './authentication'
import { MaterailPostService, MaterialPostServiceId, IMaterialPostService } from './materialPost'
import { FileUploadService, IFileUploadService, FileUploadServiceId } from './fileUpload'
import {
  IMaterialPreviewFetchService,
  MaterialPreviewFetchServiceId,
  MaterailPreviewFetchService,
} from './materialPreviewsFetch'
import { IMaterialDataService, MaterialDataServiceId, MaterialDataService } from './materialData'
import { IMaterialFetchService, MaterialFetchService, MaterialFetchServiceId } from './materialFetch'
import { Material } from 'types/materials'

export const containerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthenticationService>(AuthenticationServiceId).to(AuthenticationService)
  bind<IMaterialPostService>(MaterialPostServiceId).to(MaterailPostService)
  bind<IFileUploadService>(FileUploadServiceId).to(FileUploadService)
  bind<IMaterialPreviewFetchService>(MaterialPreviewFetchServiceId).to(MaterailPreviewFetchService)
  bind<IMaterialDataService>(MaterialDataServiceId).to(MaterialDataService)
  bind<IMaterialFetchService<Material>>(MaterialFetchServiceId).to(MaterialFetchService)
})

export const container = new Container()
