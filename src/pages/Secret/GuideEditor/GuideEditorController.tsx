import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Loadable from 'react-loadable'

import { EditorError } from 'types/verifier'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { GUIDE_DATA_VERIFIER } from 'consts/verifiers'
import { DEFAULT_GUIDE_DATA } from 'consts/defaults'
import { useGuideClient } from 'facades/materialClientFacade'

const LoadableEditorView = Loadable({
  loader: () => import('./GuideEditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const GuideEditorController = () => {
  const { guide, fetchGuide, postGuide } = useGuideClient()
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])
  const { service } = useMaterialDataServiceProvider(GUIDE_DATA_VERIFIER, DEFAULT_GUIDE_DATA)

  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    if (match.params.id) {
      fetchGuide(match.params.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (guide) {
      service.updateData(guide)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guide])

  const performDataCheck = () => {
    const errors = service.verifyData()
    setSubmitErrors(errors)
  }

  const postGuideWrapped = () => {
    const currentData = service.currentData
    postGuide(currentData, match.params.id)
  }

  return (
    <LoadableEditorView
      submitData={postGuideWrapped}
      performDataCheck={performDataCheck}
      serviceInstance={service}
      submitErrors={currentSubmitErrors}
    />
  )
}

export default GuideEditorController
