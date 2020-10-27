import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ArticleView } from './ArticleView'
import { useArticleClient } from 'facades/materialClientFacade'

const ArticlesSection: React.FC = () => {
  const { article, fetchArticle } = useArticleClient()
  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    fetchArticle(match.params.id)
  }, [])

  return <ArticleView article={article} />
}

export default ArticlesSection
