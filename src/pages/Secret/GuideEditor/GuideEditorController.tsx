import React, { useState } from 'react'
import { useRouteMatch } from 'react-router-dom'

import GuideEditorView from './GuideEditorView'
import { EditorError } from 'types/verifier'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { GUIDE_DATA_VERIFIER } from 'consts/verifiers'
import { DEFAULT_GUIDE_DATA } from 'consts/defaults'
import { useGuidePostFacade } from 'facades/materialPostFacade'

const GuideEditorController = () => {
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])
  const { service } = useMaterialDataServiceProvider(GUIDE_DATA_VERIFIER, DEFAULT_GUIDE_DATA)

  const { postGuide } = useGuidePostFacade()

  const match = useRouteMatch<{ id: string }>()

  const performDataCheck = () => {
    const errors = service.verifyData()
    setSubmitErrors(errors)
  }

  const postGuideWrapped = () => {
    const currentData = service.currentData
    postGuide(currentData, match.params.id)
  }

  return (
    <GuideEditorView
      submitData={postGuideWrapped}
      performDataCheck={performDataCheck}
      serviceInstance={service}
      submitErrors={currentSubmitErrors}
    />
  )
}

export default GuideEditorController
