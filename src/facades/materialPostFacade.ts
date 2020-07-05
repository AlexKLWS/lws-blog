import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { MaterialPostServiceId, IMaterialPostService } from 'services/materialPost'
import { Category } from 'types/materials'

export const useArticlePostFacade = () => {
  const service = useRef(useInjection<IMaterialPostService>(MaterialPostServiceId))
  const postArticle = (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | string,
    articleIconWidth: string,
    articleIconHeight: string,
    category: Category,
    referenceId?: string,
  ) => {
    service.current.postArticle(
      articleName,
      articleSubtitle,
      articleText,
      articleIcon,
      articleIconWidth,
      articleIconHeight,
      category,
      referenceId,
    )
  }

  return { postArticle }
}
