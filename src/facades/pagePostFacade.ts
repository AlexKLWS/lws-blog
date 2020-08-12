import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { MaterialPostServiceId, IMaterialPostService } from 'services/materialPost'
import { PageData } from 'types/materials'

export const usePagePostFacade = () => {
  const service = useRef(useInjection<IMaterialPostService>(MaterialPostServiceId))
  const postPage = (page: PageData, referenceId?: string) => {
    service.current.postPage(page, referenceId)
  }

  return { postPage }
}
