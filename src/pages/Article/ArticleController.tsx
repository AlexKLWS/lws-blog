import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ArticleView } from './ArticleView'
import { useArticleProvider } from 'facades/articleFetchFacade'

const ArticlesSection: React.FC<RouteComponentProps<{ id: string }>> = (props: RouteComponentProps<{ id: string }>) => {
  const { article, fetchArticle } = useArticleProvider()

  useEffect(() => {
    fetchArticle(props.match.params.id)
  }, [])

  return <ArticleView article={article} />
}

export default ArticlesSection
