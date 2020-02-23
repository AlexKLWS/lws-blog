import React from 'react'
import { RouteProps } from 'react-router-dom'

const ArticlesSection: React.FC<RouteProps> = (props: RouteProps) => {
  console.log('PROPS: ', props)
  return (
    <div>
      <h1>ArticlesSection</h1>
    </div>
  )
}

export default ArticlesSection
