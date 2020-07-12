import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Loadable from 'react-loadable'

import editorErrors from 'consts/editorErrors'
import { useArticlePostFacade } from 'facades/materialPostFacade'
import { EditorError } from 'types/editor'
import { useArticleProvider } from 'facades/articleFetchFacade'
import { Category } from 'types/materials'

const LoadableEditorView = Loadable({
  loader: () => import('./EditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const EditorController: React.FC = () => {
  const { postArticle } = useArticlePostFacade()
  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])
  const match = useRouteMatch<{ id: string }>()

  const { article, fetchArticle } = useArticleProvider()

  useEffect(() => {
    if (match.params.id) {
      fetchArticle(match.params.id)
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

  const postArticleWrapped = (
    articleName: string,
    articleSubtitle: string,
    articleText: string,
    articleIcon: File | string,
    articleIconWidth: string,
    articleIconHeight: string,
    category: Category,
  ) => {
    postArticle(
      articleName,
      articleSubtitle,
      articleText,
      articleIcon,
      articleIconWidth,
      articleIconHeight,
      category,
      match.params.id,
    )
  }

  return (
    <LoadableEditorView
      submitData={postArticleWrapped}
      performDataCheck={performDataCheck}
      submitErrors={currentSubmitErrors}
      articleDefaults={article}
    />
  )
}

export default EditorController
