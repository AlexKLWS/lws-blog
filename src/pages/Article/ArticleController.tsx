import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ArticleView } from './ArticleView'
import { useArticleClient } from 'facades/materialClientFacade'
import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'

const ArticlesSection: React.FC = () => {
  const { article, error, fetchArticle } = useArticleClient()
  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    fetchArticle(match.params.id)
    window.scrollTo(0, 0)
  }, [])

  if (error) {
    return <FullscreenMessageView title={`Sorry!`} subtitle={`There's nothing here yet!`} />
  }

  return <ArticleView article={article} />
}

export default ArticlesSection
