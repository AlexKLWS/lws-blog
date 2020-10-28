import React, { useEffect } from 'react'

import GuideView from './GuideView'
import { useRouteMatch } from 'react-router-dom'
import { useGuideClient } from 'facades/materialClientFacade'

const GUIDE_PAGE_INFO = 'Here is my personal short list of places I find to be really worthy of a visit.'

const GuideController: React.FC = () => {
  const { guide, fetchGuide } = useGuideClient()
  const match = useRouteMatch<{ id: string }>()

  useEffect(() => {
    fetchGuide(match.params.id)
  }, [])

  if (!guide) {
    return null
  }

  return (
    <GuideView
      guideInfo={guide.info}
      locations={guide.locations}
      defaultZoom={guide.defaultZoom}
      defaultCenter={guide.defaultCenter}
    />
  )
}

export default GuideController
