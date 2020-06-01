import React from 'react'
import { RouteProps, useParams } from 'react-router-dom'

const ArticlesSection: React.FC<RouteProps> = (props: RouteProps) => {
  console.log('PROPS: ', props)
  let { id } = useParams()
  console.log('ID: ', id)
  return (
    <div>
      <h1>ArticlesSection</h1>
    </div>
  )
}

export default ArticlesSection
