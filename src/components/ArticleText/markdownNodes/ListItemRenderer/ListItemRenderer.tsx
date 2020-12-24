import React from 'react'

import { MarkdownNodeProps } from 'types/markdown'

import './ListItemRenderer.scss'

const ListItemRenderer = (props: MarkdownNodeProps) => {
  return <li className={'ListItemRenderer'}>{props.children}</li>
}

export default ListItemRenderer
