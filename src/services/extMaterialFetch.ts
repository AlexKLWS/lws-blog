import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'
import { BehaviorSubject } from 'rxjs'

import { ExtMaterial } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'

export interface IExtMaterialFetchService {
  extMaterial: BehaviorSubject<ExtMaterial | null>
  fetchExtMaterail: (id: string) => Promise<void>
}

@injectable()
export class ExtMaterialFetchService implements IExtMaterialFetchService {
  private readonly _extMaterial: BehaviorSubject<ExtMaterial | null> = new BehaviorSubject<ExtMaterial | null>(null)

  public get extMaterial() {
    return this._extMaterial
  }

  public async fetchExtMaterail(id: string) {
    const params = {
      id,
    }

    const request: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiEndpoint}/ext-materials`,
      params,
    }

    try {
      const response = await axios(request)
      this._extMaterial.next(response.data)
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }
}

export const PageFetchServiceId = Symbol('PageFetchService')
