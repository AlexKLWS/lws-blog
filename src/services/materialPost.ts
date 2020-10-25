import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { Article, ExtMaterial, Material, Guide } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { getCookie } from 'helpers/cookies'

export interface IMaterialPostService {
  postArticle: (article: Article, referenceId?: string) => Promise<void>
  postExtMaterial: (page: ExtMaterial, referenceId?: string) => Promise<void>
  postGuide: (guide: Guide, referenceId?: string) => Promise<void>
}

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.log('REQUEST: ', config)
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log('RESPONSE: ', response)
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  },
)

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
    transformedData.icon.data = iconText
    transformedData.icon.width = iconWidth
    transformedData.icon.height = iconHeight
    return transformedData
  }

  public async postExtMaterial(extMaterial: ExtMaterial, referenceId?: string) {
    const data = await this._prepareMaterialForPost<ExtMaterial>(extMaterial, referenceId)

    const request = {
      method: 'POST',
      url: `${apiEndpoint}/ext-materials`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
        'Content-Type': 'application/json',
      },
      data,
    }

    try {
      //@ts-ignore
      const response = await axios(request)
      const responseData = await response.data
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  public async postArticle(article: Article, referenceId?: string) {
    const data = await this._prepareMaterialForPost<Article>(article, referenceId)

    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${apiEndpoint}/articles`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
        'Content-Type': 'application/json',
      },
      data,
    }

    try {
      const response = await axios(request)
      const responseData = await response.data
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }

  public async postGuide(guide: Guide, referenceId?: string) {
    const data = await this._prepareMaterialForPost<Guide>(guide, referenceId)

    const request: AxiosRequestConfig = {
      method: 'POST',
      url: `${apiEndpoint}/guides`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
        'Content-Type': 'application/json',
      },
      data,
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
