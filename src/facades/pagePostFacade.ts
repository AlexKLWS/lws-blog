import { useRef } from 'react'

import { useInjection } from 'services/provider'
import { MaterialPostServiceId, IMaterialPostService } from 'services/materialPost'
import { ExtMaterial } from 'types/materials'

export const useExtMaterialPostFacade = () => {
  const service = useRef(useInjection<IMaterialPostService>(MaterialPostServiceId))
  const postExtMaterial = (extMaterial: ExtMaterial, referenceId?: string) => {
    service.current.postExtMaterial(extMaterial, referenceId)
  }

  return { postExtMaterial }
}
