import { useRef } from 'react'
import { useInjection } from 'services/provider'
import { IMaterialDataService, MaterialDataServiceId } from 'services/materialData'

export const useMaterialDataServiceProvider = () => {
  const service = useRef(useInjection<IMaterialDataService>(MaterialDataServiceId)).current

  return { service }
}
