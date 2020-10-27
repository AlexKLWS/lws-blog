import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { Article, ExtMaterial, Material, Guide } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { getCookie } from 'helpers/cookies'

export interface IMaterialClientService {
  postArticle: (article: Article, referenceId?: string) => Promise<void>
  postExtMaterial: (page: ExtMaterial, referenceId?: string) => Promise<void>
  postGuide: (guide: Guide, referenceId?: string) => Promise<void>
}

@injectable()
export class MaterailClientService implements IMaterialClientService {
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

  private async _postMaterial<T extends Material>(url: string, material: T, referenceId?: string) {
    const data = await this._prepareMaterialForPost<T>(material, referenceId)

    const request: AxiosRequestConfig = {
      method: 'POST',
      url,
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

  public async postExtMaterial(extMaterial: ExtMaterial, referenceId?: string) {
    await this._postMaterial(`${apiEndpoint}/ext-materials`, extMaterial, referenceId)
  }

  public async postArticle(article: Article, referenceId?: string) {
    await this._postMaterial(`${apiEndpoint}/articles`, article, referenceId)
  }

  public async postGuide(guide: Guide, referenceId?: string) {
    await this._postMaterial(`${apiEndpoint}/guides`, guide, referenceId)
  }
}

export const MaterialClientServiceId = Symbol('MaterialClientService')
