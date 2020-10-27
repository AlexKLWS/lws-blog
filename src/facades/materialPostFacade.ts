import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { MaterialClientServiceId, IMaterialClientService } from 'services/materialClient'
import { Article, ExtMaterial, Guide } from 'types/materials'

export const useArticlePostFacade = () => {
  const service = useRef(useInjection<IMaterialClientService>(MaterialClientServiceId))
  const postArticle = (article: Article, referenceId?: string) => {
    service.current.postArticle(article, referenceId)
  }

  return { postArticle }
}

export const useGuidePostFacade = () => {
  const service = useRef(useInjection<IMaterialClientService>(MaterialClientServiceId))
  const postGuide = (guide: Guide, referenceId?: string) => {
    service.current.postGuide(guide, referenceId)
  }

  return { postGuide }
}

export const useExtMaterialPostFacade = () => {
  const service = useRef(useInjection<IMaterialClientService>(MaterialClientServiceId))
  const postExtMaterial = (extMaterial: ExtMaterial, referenceId?: string) => {
    service.current.postExtMaterial(extMaterial, referenceId)
  }

  return { postExtMaterial }
}
