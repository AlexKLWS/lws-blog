import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import './ParagraphRenderer.scss'

const ParagraphRenderer = (props: MarkdownNodeProps) => {
  return <p className={'ParagraphRenderer'}>{props.value}</p>
}

export default ParagraphRenderer
