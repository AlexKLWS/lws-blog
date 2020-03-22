import { injectable } from 'inversify'
import axios from 'axios'

import { ArticleData } from 'types/materials'
import { apiEndpoint } from 'consts/endpoints'

export interface IArticlePostService {
  postArticle: (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File,
    articleIconWidth: string,
    articleIconHeight: string,
  ) => Promise<void>
}

@injectable()
export class ArticlePostService implements IArticlePostService {
  private async formArticlData(
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File,
    articleIconWidth: string,
    articleIconHeight: string,
  ): Promise<ArticleData> {
    // @ts-ignore
    const iconText = await articleIcon.text()
    let iconWidth
    if (articleIconWidth.length > 0) {
      iconWidth = articleIconWidth
    } else {
      iconWidth = articleIconHeight.length > 0 ? articleIconHeight : null
    }
    let iconHeight
    if (articleIconHeight.length > 0) {
      iconHeight = articleIconHeight
    } else {
      iconHeight = articleIconWidth.length > 0 ? articleIconWidth : null
    }
    return {
      name: articleName,
      subtitle: articleSubtitle,
      articleText: articleText,
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
  ) {
    const articleData = await this.formArticlData(
      articleName,
      articleSubtitle,
      articleText,
      articleIcon,
      articleIconWidth,
      articleIconHeight,
    )

    const request = {
      method: 'POST',
      url: `${apiEndpoint}/new-article`,
      data: articleData,
    }

    try {
      //@ts-ignore
      const response = await axios(request)
      const responseData = await response.data
    } catch (e) {
      console.log('ERROR: ', e)
    }
  }
}

export const ArticlePostServiceId = Symbol('ArticlePostService')
