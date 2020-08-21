import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { MaterialPostServiceId, IMaterialPostService } from 'services/materialPost'
import { GuideData } from 'types/materials'

export const useGuidePostFacade = () => {
  const service = useRef(useInjection<IMaterialPostService>(MaterialPostServiceId))
  const postGuide = (guide: GuideData, referenceId?: string) => {
    service.current.postGuide(guide, referenceId)
  }

  return { postGuide }
}