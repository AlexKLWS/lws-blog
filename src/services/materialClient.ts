import { inject, injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { Article, ExtMaterial, Material, Guide } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { ISessionService, SessionServiceId } from './authentication'

export interface IMaterialClientService<T extends Material> {
  material: BehaviorSubject<T | null>
  postArticle: (article: Article, referenceId?: string) => Promise<void>
  postExtMaterial: (page: ExtMaterial, referenceId?: string) => Promise<void>
  postGuide: (guide: Guide, referenceId?: string) => Promise<void>
  fetchArticle: (id: string) => Promise<void>
  fetchExtMaterial: (id: string) => Promise<void>
  fetchGuide: (id: string) => Promise<void>
}

@injectable()
export class MaterailClientService<T extends Material> implements IMaterialClientService<T> {
  private readonly _material: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null)
  private readonly _sessionService: ISessionService

  public constructor(@inject(SessionServiceId) sessionService: ISessionService) {
    this._sessionService = sessionService
  }

  public get material() {
    return this._material
  }

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
    const [iconWidth, iconHeight] = this._processIconDimensions(
      String(transformedData.icon.width),
      String(transformedData.icon.height),
    )
    transformedData.icon.data = iconText
    transformedData.icon.width = iconWidth
    transformedData.icon.height = iconHeight
    return transformedData
  }

  private async _postMaterial<T extends Material>(url: string, material: T, referenceId?: string) {
    const data = await this._prepareMaterialForPost<T>(material, referenceId)
    const authToken = `Bearer ${this._sessionService.getToken()}`

    const request: AxiosRequestConfig = {
      method: 'POST',
      url,
      headers: {
        Authorization: authToken,
        'Content-Type': 'application/json',
      },
      data,
    }

    try {
      const response = await axios(request)
      this._material.next(response.data)
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

  private async _fetchMaterial(url: string, id: string) {
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

  public async fetchArticle(id: string) {
    await this._fetchMaterial(`${apiEndpoint}/articles`, id)
  }

  public async fetchExtMaterial(id: string) {
    await this._fetchMaterial(`${apiEndpoint}/ext-materials`, id)
  }

  public async fetchGuide(id: string) {
    await this._fetchMaterial(`${apiEndpoint}/guides`, id)
  }
}

export const MaterialClientServiceId = Symbol('MaterialClientService')
