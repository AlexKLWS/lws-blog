import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ArticleView } from './ArticleView'
import { useArticleProvider } from 'facades/materialFetchFacade'

const ArticlesSection: React.FC = () => {
  const { article, fetchArticle } = useArticleProvider()
  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    fetchArticle(match.params.id)
  }, [])

  return <ArticleView article={article} />
}

export default ArticlesSection
