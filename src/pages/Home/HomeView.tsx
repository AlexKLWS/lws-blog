import React, { useRef } from 'react'
import { useTrail, animated, useSpring, useChain, config } from 'react-spring'

import { PreviewMaterial } from 'types/materials'
import { default as arrow } from 'assets/icons/Arrow.svg'

import './Home.scss'
import InlineIcon from 'components/InlineIcon'

interface Props {
  materialPreviews: PreviewMaterial[]
  currentPage: number
  pagesCount: number
  navigateToNextPage: () => void
  navigateToPrevPage: () => void
  onPreviewItemPress: (previewMaterial: PreviewMaterial) => void
}

const HomeView: React.FC<Props> = (props: Props) => {
  const renderPreviewsItems = (previewMaterial: PreviewMaterial) => {
    return (
      <div key={previewMaterial.referenceId} className={'Material-preview-item-container'}>
        <div
          tabIndex={0}
          className={'Material-preview-item'}
          onClick={() => {
            props.onPreviewItemPress(previewMaterial)
          }}
          onKeyPressCapture={() => {
            props.onPreviewItemPress(previewMaterial)
          }}
        >
          <div className={'Material-preview-icon-container'}>
            <InlineIcon svg={previewMaterial.icon.data} />
          </div>
          <div>
            <p className={'Material-preview-items-title'}>{previewMaterial.name}</p>
            <p className={'Material-preview-items-subtitle'}>{previewMaterial.subtitle}</p>
          </div>
        </div>
      </div>
    )
  }

  const renderPageControls = () => {
    return (
      <div className='Pagination-controls-container'>
        <div style={{ display: 'flex' }}>
          <button className='App-button' onClick={props.navigateToPrevPage}>
            <img src={arrow} />
          </button>
          <p className='Page-index'>{`${props.currentPage}/${props.pagesCount}`}</p>
          <button className='App-button' onClick={props.navigateToNextPage}>
            <img className={'Arrow-right'} src={arrow} />
          </button>
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
      <div className='Previews-grid'>
        {transitions.map((p, index) => (
          <animated.div key={`${index}`} style={p}>
            {renderPreviewsItems(props.materialPreviews[index])}
          </animated.div>
        ))}
      </div>
      {props.pagesCount > 1 ? renderPageControls() : null}
    </div>
  )
}

export default HomeView
