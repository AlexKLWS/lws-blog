import React from 'react'
import { useParams, RouteComponentProps } from 'react-router-dom'
import { ArticleView } from './ArticleView'

const ArticlesSection: React.FC<RouteComponentProps<{ id: string }>> = (props: RouteComponentProps<{ id: string }>) => {
  console.log('ID: ', props.match.params.id)
  return <ArticleView />
}

export default ArticlesSection
