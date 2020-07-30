import React from 'react'
import moment from 'moment'
import { ArticleData } from 'types/materials'
import ReactMarkdown from 'react-markdown'

import './Article.scss'

import CodeRenderView from './markdownNodes/CodeRenderer/CodeRendererView'
import InlineCodeRenderer from './markdownNodes/InlineCodeRenderer/InlineCodeRenderer'
import TextRenderer from './markdownNodes/TextRenderer/TextRenderer'
import ImageRenderer from './markdownNodes/ImageRenderer/ImageRenderer'

interface Props {
  article: ArticleData | null
}

export const ArticleView: React.FC<Props> = ({ article }: Props) => {
  const date = !!article && moment(article.createdAt!).format('DD/MM/YYYY')
  return (
    <div className={'ArticleContainer'}>
      <div className={'ArticleTitleContainer'}>
        <h1 className={'ArticleTitle'}>{article?.name}</h1>
        <h3 className={'ArticleSubtitle'}>{article?.subtitle}</h3>
      </div>
      {!!article && (
        <ReactMarkdown
          source={article.articleText}
          renderers={{ code: CodeRenderView, inlineCode: InlineCodeRenderer, text: TextRenderer, image: ImageRenderer }}
        />
      )}
      <p className={'ArticleDate'}>{date}</p>
    </div>
  )
}
