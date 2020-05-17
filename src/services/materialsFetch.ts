import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { Category, PreviewMaterial } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { BehaviorSubject } from 'rxjs'

export interface IMaterialFetchService {
  materialPreviews: BehaviorSubject<PreviewMaterial[]>
  fetchMaterialPreviews: (date?: Date, category?: Category) => Promise<void>
}

@injectable()
export class MaterailFetchService implements IMaterialFetchService {
  private readonly _materials: BehaviorSubject<PreviewMaterial[]> = new BehaviorSubject<PreviewMaterial[]>([])

  public get materialPreviews() {
    return this._materials
  }

  public async fetchMaterialPreviews(date?: Date, category?: Category) {
    const request: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiEndpoint}/materials`,
      withCredentials: true,
    }

    try {
      const response = await axios(request)
      const responseData = response.data || []
      this._materials.next(responseData)
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  public async fetchMaterialsForCategory(category: Category) {
    return Promise.resolve()
  }
}

export const MaterialFetchServiceId = Symbol('MaterialFetchService')
