import { useRef, useEffect } from 'react'
import { useInjection } from 'services/provider'
import { IMaterialDataService, MaterialDataServiceId } from 'services/materialData'
import { MaterialDataObjectVerifier } from 'types/verifier'

export const useMaterialDataServiceProvider = (verifier: MaterialDataObjectVerifier, defaultData?: any) => {
  const service = useRef(useInjection<IMaterialDataService>(MaterialDataServiceId)).current

  useEffect(() => {
    service.setup(verifier, defaultData)
  }, [])

  return { service }
}
