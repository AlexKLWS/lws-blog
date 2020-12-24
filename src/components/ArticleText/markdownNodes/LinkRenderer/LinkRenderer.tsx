import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import './LinkRenderer.scss'

const LinkRenderer = (props: MarkdownNodeProps) => {
  return (
    <a href={props.href} className={'LinkRenderer'}>
      {props.children}
    </a>
  )
}

export default LinkRenderer
