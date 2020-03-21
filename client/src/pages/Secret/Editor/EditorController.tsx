import React, { useState } from 'react'
import { RouteProps } from 'react-router-dom'

import EditorView from './EditorView'
import editorErrors from 'consts/editorErrors'
import { EditorError } from 'types/editor'

const EditorController: React.FC<RouteProps> = (props: RouteProps) => {
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])
  const submitData = (articleName: string, articleSubtitle: string, articleText: string) => {}

  const performDataCheck = (articleName: string, articleSubtitle: string, articleText: string) => {
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
    setSubmitErrors(errors)
  }

  return <EditorView submitData={submitData} performDataCheck={performDataCheck} submitErrors={currentSubmitErrors} />
}

export default EditorController
