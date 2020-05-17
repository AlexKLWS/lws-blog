import React, { useState } from 'react'
import Loadable from 'react-loadable'

import { EditorError } from 'types/editor'
import pageEditorErrors from 'consts/pageEditorErrors'
import { usePagePostFacade } from 'facades/pagePostFacade'
import { RouteProps } from 'react-router-dom'

const LoadablePageEditorView = Loadable({
  loader: () => import('./PageEditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const PageEditorController: React.FC<RouteProps> = (props: RouteProps) => {
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])

  const [postPage] = usePagePostFacade()

  const performDataCheck = (pageName: string, pageSubtitle: string, pageIcon: File | null, pageURL: string) => {
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
    />
  )
}

export default PageEditorController
