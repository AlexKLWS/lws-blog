import React, { useState, useEffect } from 'react'
import Loadable from 'react-loadable'

import { EditorError } from 'types/verifier'
import { useExtMaterialPostFacade } from 'facades/materialPostFacade'
import { useRouteMatch } from 'react-router-dom'
import { useExtMaterialProvider } from 'facades/materialFetchFacade'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { DEFAULT_EXT_MATERIAL_DATA } from 'consts/defaults'
import { PAGE_DATA_VERIFIER } from 'consts/verifiers'

const LoadableExtMaterialEditorView = Loadable({
  loader: () => import('./ExtMaterialEditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const ExtMaterialEditorController: React.FC = () => {
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])

  const { extMaterial, fetchExtMaterial } = useExtMaterialProvider()
  const { service } = useMaterialDataServiceProvider(PAGE_DATA_VERIFIER, DEFAULT_EXT_MATERIAL_DATA)
  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    if (match.params.id) {
      fetchExtMaterial(match.params.id)
    }
  }, [])

  useEffect(() => {
    if (extMaterial) {
      service.updateData(extMaterial)
    }
  }, [extMaterial])

  const { postExtMaterial } = useExtMaterialPostFacade()

  const performDataCheck = () => {
    const errors = service.verifyData()
    setSubmitErrors(errors)
  }

  const postWrapped = () => {
    const currentData = service.currentData
    postExtMaterial(currentData, match.params.id)
  }

  return (
    <LoadableExtMaterialEditorView
      serviceInstance={service}
      submitErrors={currentSubmitErrors}
      performDataCheck={performDataCheck}
      submitData={postWrapped}
    />
  )
}

export default ExtMaterialEditorController
