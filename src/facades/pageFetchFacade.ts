import React, { useRef, useState, useEffect } from 'react'
import { useInjection } from 'services/provider'
import { Subscription } from 'rxjs'
import { PageData } from 'types/materials'
import { IPageFetchService, PageFetchServiceId } from 'services/pageFetch'

export const usePageMaterialProvider = () => {
  const service = useRef(useInjection<IPageFetchService>(PageFetchServiceId))

  const fetchPage = (id: string) => {
    service.current.fetchPage(id)
  }

  const [page, setPage] = useState<PageData | null>(null)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.page.subscribe((a) => {
        setPage(a)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { page, fetchPage }
}
