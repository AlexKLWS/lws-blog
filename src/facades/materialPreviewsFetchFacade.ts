import React, { useRef, useState, useEffect } from 'react'
import { IMaterialPreviewFetchService, MaterialPreviewFetchServiceId } from 'services/materialPreviewsFetch'
import { useInjection } from 'services/provider'
import { Subscription } from 'rxjs'
import { Category, PreviewMaterial } from 'types/materials'

export const useMaterialPreviewsProvider = () => {
  const service = useRef(useInjection<IMaterialPreviewFetchService>(MaterialPreviewFetchServiceId))

  const fetchMaterialPreviews = (category: Category, page: string | number) => {
    service.current.fetchMaterialPreviews(category, page)
  }

  const [materialPreviews, setMaterialPreviews] = useState<PreviewMaterial[]>([])
  const [pagesCount, setPagesCount] = useState<number>(1)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.materialPreviews.subscribe((m) => {
        setMaterialPreviews(m.materialPreviews)
        setPagesCount(m.pagesCount)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { materialPreviews, pagesCount, fetchMaterialPreviews }
}
