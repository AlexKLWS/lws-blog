import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { ArticlePostServiceId, IArticlePostService } from 'services/articlePost'

export function useArticlePostFacade(): [
  (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File,
    articleIconWidth: string,
    articleIconHeight: string,
  ) => void,
] {
  const service = useRef(useInjection<IArticlePostService>(ArticlePostServiceId))
  const postArticle = (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File,
    articleIconWidth: string,
    articleIconHeight: string,
  ) => {
    service.current.postArticle(
      articleName,
      articleSubtitle,
      articleText,
      articleIcon,
      articleIconWidth,
      articleIconHeight,
    )
  }

  return [postArticle]
}
