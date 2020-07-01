import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import './TextRenderer.scss'

const TextRenderer = (props: MarkdownNodeProps) => {
  return <span className={'TextRenderer'}>{props.value}</span>
}

export default TextRenderer
