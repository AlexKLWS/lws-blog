import { useRef, useEffect } from 'react'
import { useInjection } from 'services/provider'
import { IMaterialDataService, MaterialDataServiceId } from 'services/materialData'

export const useMaterialDataServiceProvider = (defaultData?: any) => {
  const service = useRef(useInjection<IMaterialDataService>(MaterialDataServiceId)).current

  useEffect(() => {
    if (defaultData) {
      service.init(defaultData)
    }
  }, [])

  return { service }
}
