import React, { useState } from 'react'
import { RouteProps } from 'react-router-dom'
import Loadable from 'react-loadable'

import EditorView from './EditorView'
import editorErrors from 'consts/editorErrors'
import { useArticlePostFacade } from 'services/facades/articlePostFacade'
import { EditorError } from 'types/editor'

const LoadableEditorView = Loadable({
  loader: () => import('./EditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const EditorController: React.FC<RouteProps> = (props: RouteProps) => {
  const [postArticle] = useArticlePostFacade()
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])

  const performDataCheck = (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | null,
  ) => {
    const errors: EditorError[] = []
    if (!articleName || articleName.length === 0) {
      errors.push(editorErrors.noArticleName)
    }
    if (!articleSubtitle || articleSubtitle.length === 0) {
      errors.push(editorErrors.noArticleSubtitle)
    }
    if (!articleText || articleText.length === 0) {
      errors.push(editorErrors.noArticleText)
    }
    if (!articleIcon) {
      errors.push(editorErrors.noArticleIcon)
    }
    setSubmitErrors(errors)
  }

  return (
    <LoadableEditorView
      submitData={postArticle}
      performDataCheck={performDataCheck}
      submitErrors={currentSubmitErrors}
    />
  )
}

export default EditorController
