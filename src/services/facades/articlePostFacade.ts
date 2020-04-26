import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { ArticlePostServiceId, IMaterialPostService } from 'services/materialPost'
import { Category } from 'types/materials'

export function useArticlePostFacade(): [
  (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File,
    articleIconWidth: string,
    articleIconHeight: string,
    category: Category,
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
    category: Category,
  ) => {
    service.current.postArticle(
      articleName,
      articleSubtitle,
      articleText,
      articleIcon,
      articleIconWidth,
      articleIconHeight,
      category,
    )
  }

  return [postArticle]
}
