import React from 'react'
import { ArticleData } from 'types/materials'

import ReactMarkdown from 'react-markdown'
import CodeRenderView from 'components/markdownNodes/CodeRenderer/CodeRendererView'
import InlineCodeRenderer from 'components/markdownNodes/InlineCodeRenderer/InlineCodeRenderer'

interface Props {
  article: ArticleData | null
}

export const ArticleView: React.FC<Props> = ({ article }: Props) => {
  let source

  if (article) {
    source = `\`import React, { useState } from "react";\`` + ` \n ` + article.articleText
  }

  return (
    <div>
      <h1>ArticlesSection</h1>
      {!!article && (
        <ReactMarkdown source={source} renderers={{ code: CodeRenderView, inlineCode: InlineCodeRenderer }} />
      )}
    </div>
  )
}
