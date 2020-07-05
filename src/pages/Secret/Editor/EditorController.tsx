import React, { useState, useEffect } from 'react'
import { RouteProps, RouteComponentProps } from 'react-router-dom'
import Loadable from 'react-loadable'

import editorErrors from 'consts/editorErrors'
import { useArticlePostFacade } from 'facades/materialPostFacade'
import { EditorError } from 'types/editor'
import { useArticleProvider } from 'facades/articleFetchFacade'

const LoadableEditorView = Loadable({
  loader: () => import('./EditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const EditorController: React.FC<RouteComponentProps<{ id?: string }>> = (
  props: RouteComponentProps<{ id?: string }>,
) => {
  const [postArticle] = useArticlePostFacade()
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])

  const { article, fetchArticle } = useArticleProvider()

  useEffect(() => {
    if (props.match.params.id) {
      fetchArticle(props.match.params.id)
    }
  }, [])

  const performDataCheck = (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | string | null,
  ) => {
    const errors: EditorError[] = []
    if (!articleName) {
      errors.push(editorErrors.noArticleName)
    }
    if (!articleSubtitle) {
      errors.push(editorErrors.noArticleSubtitle)
    }
    if (!articleText) {
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
      articleDefaults={article}
    />
  )
}

export default EditorController
