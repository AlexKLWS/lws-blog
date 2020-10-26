import React, { useEffect } from 'react'

import GuideView from './GuideView'
import { useRouteMatch } from 'react-router-dom'
import { useGuideProvider } from 'facades/materialFetchFacade'

const GUIDE_PAGE_INFO = 'Here is my personal short list of places I find to be really worthy of a visit.'

const GuideController: React.FC = () => {
  const { guide, fetchGuide } = useGuideProvider()
  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    fetchGuide(match.params.id)
  }, [])

  if (!guide) {
    return null
  }

  return (
    <GuideView
      guideInfo={GUIDE_PAGE_INFO}
      locations={guide.locations}
      defaultZoom={guide.defaultZoom}
      defaultCenter={guide.defaultCenter}
    />
  )
}

export default GuideController
