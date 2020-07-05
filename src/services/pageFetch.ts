import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'
import { BehaviorSubject } from 'rxjs'

import { PageData } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'

export interface IPageFetchService {
  page: BehaviorSubject<PageData | null>
  fetchPage: (id: string) => Promise<void>
}

@injectable()
export class PageFetchService implements IPageFetchService {
  private readonly _page: BehaviorSubject<PageData | null> = new BehaviorSubject<PageData | null>(null)

  public get page() {
    return this._page
  }

  public async fetchPage(id: string) {
    const params = {
      id,
    }

    const request: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiEndpoint}/pages`,
      params,
    }

    try {
      const response = await axios(request)
      this._page.next(response.data)
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }
}

export const PageFetchServiceId = Symbol('PageFetchService')
