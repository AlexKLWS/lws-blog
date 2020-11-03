import React from 'react'
import ReactMarkdown from 'react-markdown'

import CodeRenderView from 'components/ArticleText/markdownNodes/CodeRenderer/CodeRendererView'
import ImageRenderer from 'components/ArticleText/markdownNodes/ImageRenderer/ImageRenderer'
import InlineCodeRenderer from 'components/ArticleText/markdownNodes/InlineCodeRenderer/InlineCodeRenderer'
import TextRenderer from 'components/ArticleText/markdownNodes/TextRenderer/TextRenderer'

type Props = {
  text: string
}

const ArticleTextView: React.FC<Props> = (props: Props) => {
  return (
    <ReactMarkdown
      source={props.text}
      renderers={{
        code: CodeRenderView,
        inlineCode: InlineCodeRenderer,
        text: TextRenderer,
        image: ImageRenderer,
      }}
    />
  )
}

export default ArticleTextView
