import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Loadable from 'react-loadable'

import editorErrors from 'consts/editorErrors'
import { useArticlePostFacade } from 'facades/materialPostFacade'
import { EditorError } from 'types/editor'
import { useArticleProvider } from 'facades/articleFetchFacade'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { DEFAULT_ARTICLE_DATA } from 'consts/defaults'

const LoadableEditorView = Loadable({
  loader: () => import('./EditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const EditorController: React.FC = () => {
  const { postArticle } = useArticlePostFacade()
  const { service } = useMaterialDataServiceProvider(DEFAULT_ARTICLE_DATA)

  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])
  const match = useRouteMatch<{ id: string }>()

  const { article, fetchArticle } = useArticleProvider()

  useEffect(() => {
    if (match.params.id) {
      fetchArticle(match.params.id)
    }
  }, [])

  useEffect(() => {
    service.updateData(article)
  }, [article])

  const performDataCheck = () => {
    const errors: EditorError[] = []
    const currentData = service.currentData
    if (!currentData.name) {
      errors.push(editorErrors.noArticleName)
    }
    if (!currentData.subtitle) {
      errors.push(editorErrors.noArticleSubtitle)
    }
    if (!currentData.text) {
      errors.push(editorErrors.noArticleText)
    }
    if (!currentData.icon || !currentData.icon.data) {
      errors.push(editorErrors.noArticleIcon)
    }
    setSubmitErrors(errors)
  }

  const postArticleWrapped = () => {
    const currentData = service.currentData
    postArticle(currentData, match.params.id)
  }

  return (
    <LoadableEditorView
      serviceInstance={service}
      submitData={postArticleWrapped}
      performDataCheck={performDataCheck}
      submitErrors={currentSubmitErrors}
    />
  )
}

export default EditorController
