import React from 'react'

interface Props {
  articleText?: string
}

export const ArticleView: React.FC<Props> = ({ articleText }: Props) => {
  return (
    <div>
      <h1>ArticlesSection</h1>
    </div>
  )
}
