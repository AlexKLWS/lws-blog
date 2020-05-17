import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { MaterialPostServiceId, IMaterialPostService } from 'services/materialPost'
import { Category } from 'types/materials'

export function usePagePostFacade(): [
  (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
  ) => void,
] {
  const service = useRef(useInjection<IMaterialPostService>(MaterialPostServiceId))
  const postPage = (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File,
    pageIconWidth: string,
    pageIconHeight: string,
    pageCategory: Category,
    pageURL: string,
  ) => {
    service.current.postPage(pageName, pageSubtitle, pageIcon, pageIconWidth, pageIconHeight, pageCategory, pageURL)
  }

  return [postPage]
}
