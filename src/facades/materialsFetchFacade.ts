import React, { useRef, useState, useEffect } from 'react'
import { IMaterialFetchService, MaterialFetchServiceId } from 'services/materialsFetch'
import { useInjection } from 'services/provider'
import { Subscription } from 'rxjs'
import { Category } from 'types/materials'

export const useMaterialsProvider = () => {
  const service = useRef(useInjection<IMaterialFetchService>(MaterialFetchServiceId))

  const fetchMaterialPreviews = (category: Category, fromDate: string | null) => {
    service.current.fetchMaterialPreviews(category, fromDate)
  }

  const [materialPreviews, setMaterialPreviews] = useState<any[]>([])

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.materialPreviews.subscribe((m) => {
        setMaterialPreviews(m)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { materialPreviews, fetchMaterialPreviews }
}
