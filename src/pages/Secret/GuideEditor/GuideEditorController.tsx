import React, { useState } from 'react'

import GuideEditorView from './GuideEditorView'
import { EditorError } from 'types/verifier'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'

const GuideEditorController = () => {
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])
  const { service } = useMaterialDataServiceProvider({})

  const onSubmitButtonClick = () => {
    console.log('CURRENT-DATA-SO-FAR: ', service.currentData)
  }

  return (
    <GuideEditorView
      onSubmitButtonClick={onSubmitButtonClick}
      serviceInstance={service}
      submitErrors={currentSubmitErrors}
      guideDefaults={null}
    />
  )
}

export default GuideEditorController
