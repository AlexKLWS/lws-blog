import React from 'react'

const InlineIcon = ({ svg, height = '58px', width = '58px' }: { svg: string; height?: string; width?: string }) => {
  return <div style={{ width, height }} dangerouslySetInnerHTML={{ __html: svg }} />
}

export default InlineIcon
