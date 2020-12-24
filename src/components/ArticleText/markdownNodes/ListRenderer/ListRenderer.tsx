import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import './ListRenderer.scss'

const ListRenderer = (props: MarkdownNodeProps) => {
  if (props.ordered) {
    return <ol className='ListRenderer'>{props.children}</ol>
  } else {
    return <ul className='ListRenderer'>{props.children}</ul>
  }
}

export default ListRenderer
