import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Loadable from 'react-loadable'

import { useArticleClient } from 'facades/materialClientFacade'
import { EditorError } from 'types/verifier'
import { useMaterialDataServiceProvider } from 'facades/MaterialData/materialDataServiceFacade'
import { DEFAULT_ARTICLE_DATA } from 'consts/defaults'
import { ARTICLE_DATA_VERIFIER } from 'consts/verifiers'

const LoadableEditorView = Loadable({
  loader: () => import('./EditorView'),
  loading: () => {
    return <div>LOADING</div>
  },
})

const EditorController: React.FC = () => {
  const { article, fetchArticle, postArticle } = useArticleClient()
  const { service } = useMaterialDataServiceProvider(ARTICLE_DATA_VERIFIER, DEFAULT_ARTICLE_DATA)

  const [currentSubmitErrors, setSubmitErrors] = useState<EditorError[]>([])
  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    if (match.params.id) {
      fetchArticle(match.params.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (article) {
      service.updateData(article)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article])

  const performDataCheck = () => {
    const errors = service.verifyData()
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
