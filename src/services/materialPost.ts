import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { ArticleData, PageData, Material, GuideData } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'

export interface IMaterialPostService {
  postArticle: (article: ArticleData, referenceId?: string) => Promise<void>
  postPage: (page: PageData, referenceId?: string) => Promise<void>
  postGuide: (guide: GuideData, referenceId?: string) => Promise<void>
}

@injectable()
export class MaterailPostService implements IMaterialPostService {
  private _processIconDimensions(iconWidth: string | null, iconHeight: string | null) {
    let width
    if (iconWidth && iconWidth.length > 0) {
      width = iconWidth
    } else {
      width = iconHeight && iconHeight.length > 0 ? iconHeight : null
    }
    let height
    if (iconHeight && iconHeight.length > 0) {
      height = iconHeight
    } else {
      height = iconWidth && iconWidth.length > 0 ? iconWidth : null
    }
    return [width, height]
  }

  private async _prepareMaterialForPost<T extends Material>(data: Material, referenceId?: string): Promise<T> {
    let transformedData = { referenceId, ...data } as T
    let iconText = ''
    if (typeof transformedData.icon.data === 'string') {
      iconText = transformedData.icon.data
    } else {
      // @ts-ignore
      iconText = await transformedData.icon.data.text()
    }
    const [iconWidth, iconHeight] = this._processIconDimensions(transformedData.icon.width, transformedData.icon.height)
    transformedData.icon.width = iconWidth
    transformedData.icon.height = iconHeight
    return transformedData
  }

  public async postPage(page: PageData, referenceId?: string) {
    const pageData = await this._prepareMaterialForPost<PageData>(page, referenceId)

    const request = {
      method: 'PUT',
      url: `${apiEndpoint}/pages`,
      withCredentials: true,
      data: pageData,
    }

    try {
      //@ts-ignore
      const response = await axios(request)
      const responseData = await response.data
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  public async postArticle(article: ArticleData, referenceId?: string) {
    const articleData = await this._prepareMaterialForPost<ArticleData>(article, referenceId)

    const request: AxiosRequestConfig = {
      method: 'PUT',
      url: `${apiEndpoint}/articles`,
      withCredentials: true,
      data: articleData,
    }

    try {
      const response = await axios(request)
      const responseData = await response.data
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  public async postGuide(guide: GuideData, referenceId?: string) {
    const guideData = await this._prepareMaterialForPost<GuideData>(guide, referenceId)

    const request: AxiosRequestConfig = {
      method: 'PUT',
      url: `${apiEndpoint}/guides`,
      withCredentials: true,
      data: guideData,
    }

    try {
      const response = await axios(request)
      const responseData = await response.data
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }
}

export const MaterialPostServiceId = Symbol('MaterialPostService')
