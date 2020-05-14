import { injectable } from 'inversify'
import axios, { AxiosRequestConfig } from 'axios'

import { ArticleData, PageData, Category } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'

export interface IMaterialPostService {
  postArticle: (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File,
    articleIconWidth: string,
    articleIconHeight: string,
    articleCategory: Category,
  ) => Promise<void>
  postPage: (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
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
    pageIcon: File,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
  ): Promise<PageData> {
    // @ts-ignore
    const iconText = await pageIcon.text()
    const [iconWidth, iconHeight] = this.processIconDimensions(pageIconWidth, pageIconHeight)
    return {
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
    pageIcon: File,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
  ) {
    const pageData = await this.formPageData(
      pageName,
      pageSubtitle,
      pageIcon,
      pageIconWidth,
      pageIconHeight,
      pageCategory,
      pageURL,
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
    articleIcon: File,
    articleIconWidth: string,
    articleIconHeight: string,
    articleCategory: Category,
  ): Promise<ArticleData> {
    // @ts-ignore
    const iconText = await articleIcon.text()
    const [iconWidth, iconHeight] = this.processIconDimensions(articleIconWidth, articleIconHeight)
    return {
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
    articleIcon: File,
    articleIconWidth: string,
    articleIconHeight: string,
    articleCategory: Category,
  ) {
    const articleData = await this.formArticlData(
      articleName,
      articleSubtitle,
      articleText,
      articleIcon,
      articleIconWidth,
      articleIconHeight,
      articleCategory,
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
