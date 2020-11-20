import React from 'react'
import { useImage } from 'react-image'

import { MarkdownNodeProps } from 'types/markdown'

import './ImageRenderer.scss'

const ImageRenderer = (props: MarkdownNodeProps) => {
  const { src } = useImage({
    srcList: props.src ? props.src : '',
    useSuspense: false,
  })
  return <img className={'ImageRenderer'} src={src} width={'100%'} alt='' />
}

export default ImageRenderer
