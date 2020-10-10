import React, { useRef, useState, useEffect } from 'react'
import { useInjection } from 'services/provider'
import { Subscription } from 'rxjs'
import { ExtMaterial } from 'types/materials'
import { IExtMaterialFetchService, PageFetchServiceId } from 'services/extMaterialFetchService'

export const useExtMaterialProvider = () => {
  const service = useRef(useInjection<IExtMaterialFetchService>(PageFetchServiceId))

  const fetchExtMaterial = (id: string) => {
    service.current.fetchExtMaterail(id)
  }

  const [extMaterial, setExtMaterial] = useState<ExtMaterial | null>(null)

  useEffect(() => {
    const subscriptions: Subscription[] = [
      service.current.extMaterial.subscribe((a) => {
        setExtMaterial(a)
      }),
    ]
    return () => {
      subscriptions.forEach((it) => it.unsubscribe())
    }
  }, [])

  return { extMaterial, fetchExtMaterial }
}
