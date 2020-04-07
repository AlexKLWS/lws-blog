import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { ArticlePostServiceId, IMaterialPostService } from 'services/materialPost'

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
  const service = useRef(useInjection<IMaterialPostService>(ArticlePostServiceId))
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
