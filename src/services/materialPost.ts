import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { ArticleData, PageData, Category } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'

export interface IMaterialPostService {
  postArticle: (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | string,
    articleIconWidth: string,
    articleIconHeight: string,
    articleCategory: Category,
    referenceId?: string,
  ) => Promise<void>
  postPage: (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File | string,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
    referenceId?: string,
  ) => Promise<void>
}

@injectable()
export class MaterailPostService implements IMaterialPostService {
  private processIconDimensions(iconWidth: string, iconHeight: string) {
    let width
    if (iconWidth.length > 0) {
      width = iconWidth
    } else {
      width = iconHeight.length > 0 ? iconHeight : null
    }
    let height
    if (iconHeight.length > 0) {
      height = iconHeight
    } else {
      height = iconWidth.length > 0 ? iconWidth : null
    }
    return [width, height]
  }

  private async formPageData(
    pageName: string,
    pageSubtitle: string,
    pageIcon: File | string,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
    referenceId?: string,
  ): Promise<PageData> {
    let iconText = ''
    if (typeof pageIcon === 'string') {
      iconText = pageIcon
    } else {
      // @ts-ignore
      iconText = await pageIcon.text()
    }
    const [iconWidth, iconHeight] = this.processIconDimensions(pageIconWidth, pageIconHeight)
    return {
      referenceId,
      name: pageName,
      subtitle: pageSubtitle,
      pageURL,
      category: pageCategory,
      icon: {
        data: iconText,
        height: iconHeight,
        width: iconWidth,
      },
    }
  }

  public async postPage(
    pageName: string,
    pageSubtitle: string,
    pageIcon: File | string,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
    referenceId?: string,
  ) {
    const pageData = await this.formPageData(
      pageName,
      pageSubtitle,
      pageIcon,
      pageIconWidth,
      pageIconHeight,
      pageCategory,
      pageURL,
      referenceId,
    )

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

  private async formArticlData(
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | string,
    articleIconWidth: string,
    articleIconHeight: string,
    articleCategory: Category,
    referenceId?: string,
  ): Promise<ArticleData> {
    let iconText = ''
    if (typeof articleIcon === 'string') {
      iconText = articleIcon
    } else {
      // @ts-ignore
      iconText = await articleIcon.text()
    }
    const [iconWidth, iconHeight] = this.processIconDimensions(articleIconWidth, articleIconHeight)
    return {
      referenceId,
      name: articleName,
      subtitle: articleSubtitle,
      articleText: articleText,
      category: articleCategory,
      icon: {
        data: iconText,
        height: iconHeight,
        width: iconWidth,
      },
    }
  }

  public async postArticle(
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | string,
    articleIconWidth: string,
    articleIconHeight: string,
    articleCategory: Category,
    referenceId?: string,
  ) {
    const articleData = await this.formArticlData(
      articleName,
      articleSubtitle,
      articleText,
      articleIcon,
      articleIconWidth,
      articleIconHeight,
      articleCategory,
      referenceId,
    )

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
}

export const MaterialPostServiceId = Symbol('MaterialPostService')
