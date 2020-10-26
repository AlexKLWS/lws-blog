import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { Material } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { BehaviorSubject } from 'rxjs'

export interface IMaterialFetchService<T extends Material> {
  material: BehaviorSubject<T | null>
  fetchMaterialById: (id: string, url: string) => Promise<void>
}

@injectable()
export class MaterialFetchService<T extends Material> implements IMaterialFetchService<T> {
  private readonly _material: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null)

  public get material() {
    return this._material
  }

  public async fetchMaterialById(id: string, url: string) {
    const params = {
      id,
    }

    const request: AxiosRequestConfig = {
      method: 'GET',
      url,
      params,
    }

    try {
      const response = await axios(request)
      this._material.next(response.data)
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }
}

export const MaterialFetchServiceId = Symbol('MaterialFetchService')
