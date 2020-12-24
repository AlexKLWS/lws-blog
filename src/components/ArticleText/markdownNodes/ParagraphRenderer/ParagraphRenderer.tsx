import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import './ParagraphRenderer.scss'

const ParagraphRenderer = (props: MarkdownNodeProps) => {
  return <p className={'ParagraphRenderer'}>{props.children}</p>
}

export default ParagraphRenderer
