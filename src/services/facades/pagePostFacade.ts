import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { ArticlePostServiceId, IMaterialPostService } from 'services/materialPost'

export function usePagePostFacade(): [
  (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File,
    pageIconWidth: string,
    pageIconHeight: string,
    pageURL: string,
  ) => void,
] {
  const service = useRef(useInjection<IMaterialPostService>(ArticlePostServiceId))
  const postPage = (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File,
    pageIconWidth: string,
    pageIconHeight: string,
    pageURL: string,
  ) => {
    service.current.postPage(pageName, pageSubtitle, pageIcon, pageIconWidth, pageIconHeight, pageURL)
  }

  return [postPage]
}
