import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import './InlineCodeRenderer.scss'

const InlineCodeRenderer = (props: MarkdownNodeProps) => {
  return <span className={'InlineCodeRenderer'}>{props.value}</span>
}

export default InlineCodeRenderer
