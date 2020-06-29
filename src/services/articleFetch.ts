import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { Category, ArticleData } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { BehaviorSubject } from 'rxjs'
import { PagePreviewsData } from 'types/pagePreviewData'

export interface IArticleFetchService {
  article: BehaviorSubject<ArticleData | null>
  fetchArticle: (id: string) => Promise<void>
}

@injectable()
export class ArticleFetchService implements IArticleFetchService {
  private readonly _article: BehaviorSubject<ArticleData | null> = new BehaviorSubject<ArticleData | null>(null)

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
