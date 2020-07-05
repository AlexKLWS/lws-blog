import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { MaterialPostServiceId, IMaterialPostService } from 'services/materialPost'
import { Category } from 'types/materials'

export const usePagePostFacade = () => {
  const service = useRef(useInjection<IMaterialPostService>(MaterialPostServiceId))
  const postPage = (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File | string,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
    referenceId?: string,
  ) => {
    service.current.postPage(
      pageName,
      pageSubtitle,
      pageIcon,
      pageIconWidth,
      pageIconHeight,
      pageCategory,
      pageURL,
      referenceId,
    )
  }

  return { postPage }
}
