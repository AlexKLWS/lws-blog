import React, { useState, useEffect } from 'react'
import Loadable from 'react-loadable'

import { EditorError } from 'types/verifier'
import pageEditorErrors from 'consts/pageEditorErrors'
import { usePagePostFacade } from 'facades/pagePostFacade'
import { useRouteMatch } from 'react-router-dom'
import { usePageMaterialProvider } from 'facades/pageFetchFacade'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { DEFAULT_PAGE_DATA } from 'consts/defaults'

const LoadablePageEditorView = Loadable({
  loader: () => import('./PageEditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const PageEditorController: React.FC = () => {
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])

  const { page, fetchPage } = usePageMaterialProvider()
  const { service } = useMaterialDataServiceProvider(DEFAULT_PAGE_DATA)
  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    if (match.params.id) {
      fetchPage(match.params.id)
    }
  }, [])

  useEffect(() => {
    service.updateData(page)
  }, [page])

  const { postPage } = usePagePostFacade()

  const performDataCheck = () => {
    const errors: EditorError[] = []
    const currentData = service.currentData
    if (!currentData.name) {
      errors.push(pageEditorErrors.noPageName)
    }
    if (!currentData.subtitle) {
      errors.push(pageEditorErrors.noPageSubtitle)
    }
    if (!currentData.icon || !currentData.icon.data) {
      errors.push(pageEditorErrors.noPageIcon)
    }
    if (!currentData.pageURL) {
      errors.push(pageEditorErrors.noPageURL)
    }
    setSubmitErrors(errors)
  }

  const postPageWrapped = () => {
    const currentData = service.currentData
    postPage(currentData, match.params.id)
  }

  return (
    <LoadablePageEditorView
      serviceInstance={service}
      submitErrors={currentSubmitErrors}
      performDataCheck={performDataCheck}
      submitData={postPageWrapped}
    />
  )
}

export default PageEditorController
