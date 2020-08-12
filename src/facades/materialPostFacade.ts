import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { MaterialPostServiceId, IMaterialPostService } from 'services/materialPost'
import { ArticleData } from 'types/materials'

export const useArticlePostFacade = () => {
  const service = useRef(useInjection<IMaterialPostService>(MaterialPostServiceId))
  const postArticle = (article: ArticleData, referenceId?: string) => {
    service.current.postArticle(article, referenceId)
  }

  return { postArticle }
}
