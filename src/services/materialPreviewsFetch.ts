import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { Category } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { BehaviorSubject } from 'rxjs'
import { PagePreviewsData } from 'types/pagePreviewData'

export interface IMaterialPreviewFetchService {
  materialPreviews: BehaviorSubject<PagePreviewsData>
  fetchMaterialPreviews: (category: Category, page: string | number) => Promise<void>
}

interface RequestParams {
  page?: string | number
  category?: number
}

const PAGE_PREVIEW_DATA_DEFAULTS = {
  materialPreviews: [],
  pagesCount: 1,
  fetchInProgress: true,
}

@injectable()
export class MaterailPreviewFetchService implements IMaterialPreviewFetchService {
  private readonly _pagePreviewsData: BehaviorSubject<PagePreviewsData> = new BehaviorSubject<PagePreviewsData>(
    PAGE_PREVIEW_DATA_DEFAULTS,
  )

  public get materialPreviews() {
    return this._pagePreviewsData
  }

  public async fetchMaterialPreviews(category: Category, page: string | number) {
    const params: RequestParams = {
      category,
      page,
    }

    const request: AxiosRequestConfig = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      url: `${apiEndpoint}/previews`,
      params,
    }

    try {
      this._pagePreviewsData.next({
        materialPreviews: [],
        pagesCount: this._pagePreviewsData.value.pagesCount,
        fetchInProgress: true,
      })
      const response = await axios(request)
      const responseData = response.data
        ? { materialPreviews: response.data.previews, pagesCount: response.data.pageCount, fetchInProgress: false }
        : PAGE_PREVIEW_DATA_DEFAULTS
      this._pagePreviewsData.next(responseData)
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  public async fetchMaterialsForCategory(category: Category) {
    return Promise.resolve()
  }
}

export const MaterialPreviewFetchServiceId = Symbol('MaterialPreviewFetchService')
