import React from 'react'
import { Helmet } from 'react-helmet'
import { useTrail, animated } from 'react-spring'
import { Link } from 'react-router-dom'

import { PreviewMaterial } from 'types/materials'
import { default as arrow } from 'assets/icons/Arrow.svg'

import './Home.scss'
import InlineIcon from 'components/InlineIcon'

interface Props {
  materialPreviews: PreviewMaterial[]
  currentPage: number
  pagesCount: number
  getDifferentPageLink: (next?: boolean) => string
  getPreviewItemLink: (previewMaterial: PreviewMaterial) => string
}

const HomeView: React.FC<Props> = (props: Props) => {
  const renderPreviewsItems = (previewMaterial: PreviewMaterial) => {
    return (
      <div key={previewMaterial.referenceId} className={'Material-preview-item-container'}>
        <Link className={'Material-preview-item'} to={props.getPreviewItemLink(previewMaterial)}>
          <div className={'Material-preview-icon-container'}>
            <InlineIcon svg={previewMaterial.icon.data} />
          </div>
          <div>
            <p className={'Material-preview-items-title'}>{previewMaterial.name}</p>
            <p className={'Material-preview-items-subtitle'}>{previewMaterial.subtitle}</p>
          </div>
        </Link>
      </div>
    )
  }

  const renderPageControls = () => {
    return (
      <div className='Pagination-controls-container'>
        <div style={{ display: 'flex' }}>
          <Link className='App-button' to={props.getDifferentPageLink()}>
            <img src={arrow} />
          </Link>
          <p className='Page-index'>{`${props.currentPage}/${props.pagesCount}`}</p>
          <Link className='App-button' to={props.getDifferentPageLink(true)}>
            <img className={'Arrow-right'} src={arrow} />
          </Link>
        </div>
      </div>
    )
  }

  const transitions = useTrail(props.materialPreviews.length, {
    config: { mass: 5, tension: 1700, friction: 200 },
    from: { opacity: 0, backgroundColor: 'rgba(220, 220, 220, 1)' },
    opacity: 1,
    backgroundColor: 'rgba(220, 220, 220, 0)',
  })

  return (
    <div className='Home-container'>
      <Helmet>
        <title>LWS</title>
        <meta name='description' content='Personal blog by Alex Korzh' />
      </Helmet>
      <div className='Previews-grid'>
        {transitions.map((p, index) => (
          <animated.div key={`${index}`} style={p}>
            {renderPreviewsItems(props.materialPreviews[index])}
          </animated.div>
        ))}
      </div>
      {props.pagesCount > 1 ? renderPageControls() : <div style={{ height: '48px' }} />}
    </div>
  )
}

export default HomeView
