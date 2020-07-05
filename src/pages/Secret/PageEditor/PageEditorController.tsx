import React, { useState, useEffect } from 'react'
import Loadable from 'react-loadable'

import { EditorError } from 'types/editor'
import pageEditorErrors from 'consts/pageEditorErrors'
import { usePagePostFacade } from 'facades/pagePostFacade'
import { RouteComponentProps } from 'react-router-dom'
import { usePageMaterialProvider } from 'facades/pageFetchFacade'

const LoadablePageEditorView = Loadable({
  loader: () => import('./PageEditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const PageEditorController: React.FC<RouteComponentProps<{ id?: string }>> = (
  props: RouteComponentProps<{ id?: string }>,
) => {
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])

  const { page, fetchPage } = usePageMaterialProvider()

  useEffect(() => {
    if (props.match.params.id) {
      fetchPage(props.match.params.id)
    }
  }, [])

  const [postPage] = usePagePostFacade()

  const performDataCheck = (
    pageName: string,
    pageSubtitle: string,
    pageIcon: File | string | null,
    pageURL: string,
  ) => {
    const errors: EditorError[] = []
    if (!pageName) {
      errors.push(pageEditorErrors.noPageName)
    }
    if (!pageSubtitle) {
      errors.push(pageEditorErrors.noPageSubtitle)
    }
    if (!pageIcon) {
      errors.push(pageEditorErrors.noPageIcon)
    }
    if (!pageURL) {
      errors.push(pageEditorErrors.noPageURL)
    }
    setSubmitErrors(errors)
  }

  return (
    <LoadablePageEditorView
      submitErrors={currentSubmitErrors}
      performDataCheck={performDataCheck}
      submitData={postPage}
      pageDefaults={page}
    />
  )
}

export default PageEditorController
