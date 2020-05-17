import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { Category, PreviewMaterial } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { BehaviorSubject } from 'rxjs'

export interface IMaterialFetchService {
  materialPreviews: BehaviorSubject<PreviewMaterial[]>
  fetchMaterialPreviews: (category: Category, fromDate: string | null) => Promise<void>
}

interface RequestParams {
  fromDate?: string
  category?: number
}

@injectable()
export class MaterailFetchService implements IMaterialFetchService {
  private readonly _materials: BehaviorSubject<PreviewMaterial[]> = new BehaviorSubject<PreviewMaterial[]>([])

  public get materialPreviews() {
    return this._materials
  }

  public async fetchMaterialPreviews(category: Category, fromDate: string | null) {
    const params: RequestParams = {
      category,
      fromDate: fromDate || undefined,
    }

    const request: AxiosRequestConfig = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      url: `${apiEndpoint}/materials`,
      params,
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
