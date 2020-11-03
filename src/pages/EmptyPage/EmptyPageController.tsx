import React from 'react'

import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'

const EmptyPageController: React.FC = () => {
  return (
    <FullscreenMessageView title={`Sorry!`} subtitle={`It looks like the page you're looking for doesn't exist!`} />
  )
}

export default EmptyPageController
