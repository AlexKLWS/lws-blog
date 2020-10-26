import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { Article } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { BehaviorSubject } from 'rxjs'

export interface IArticleFetchService {
  article: BehaviorSubject<Article | null>
  fetchArticle: (id: string) => Promise<void>
}

@injectable()
export class ArticleFetchService implements IArticleFetchService {
  private readonly _article: BehaviorSubject<Article | null> = new BehaviorSubject<Article | null>(null)

  public get article() {
    return this._article
  }

  public async fetchArticle(id: string) {
    const params = {
      id,
    }

    const request: AxiosRequestConfig = {
      method: 'GET',
      url: `${apiEndpoint}/articles`,
      params,
    }

    try {
      const response = await axios(request)
      this._article.next(response.data)
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }
}

export const ArticleFetchServiceId = Symbol('ArticleFetchService')
