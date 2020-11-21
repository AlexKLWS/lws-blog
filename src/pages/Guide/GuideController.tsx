import React, { useEffect } from 'react'
import Loadable from 'react-loadable'

import { useRouteMatch } from 'react-router-dom'
import { useGuideClient } from 'facades/materialClientFacade'
import FullscreenMessageView from 'components/FullscreenMessageView/FullscreenMessageView'

const LoadableGuideView = Loadable({
  loader: () => import('./GuideView'),
  loading: () => {
    return <FullscreenMessageView title={`Loading...`} subtitle={``} />
  },
})

const GuideController: React.FC = () => {
  const { guide, fetchGuide } = useGuideClient()
  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    fetchGuide(match.params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!guide) {
    return null
  }

  return (
    <LoadableGuideView
      guideName={guide.name}
      guideSubtitle={guide.subtitle}
      guideInfo={guide.info}
      locations={guide.locations}
      defaultZoom={guide.defaultZoom}
      defaultCenter={guide.defaultCenter}
    />
  )
}

export default GuideController
