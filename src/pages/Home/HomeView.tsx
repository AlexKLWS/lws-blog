import React from 'react'
import { PreviewMaterial } from 'types/materials'
import { ReactComponent as Arrow } from 'assets/icons/Arrow.svg'

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

  const renderPreviewsList = () => {
    let index = 0
    const previewItemsRows = []

    while (index < props.materialPreviews.length) {
      const rowItems = []
      rowItems.push(props.materialPreviews[index])
      index++
      if (index < props.materialPreviews.length) {
        rowItems.push(props.materialPreviews[index])
        index++
      }
      const row = (
        <div key={`${index}`} className={'Material-preview-items-row'}>
          {renderPreviewsItems(rowItems[0])}
          {!!rowItems[1] ? (
            <>
              <div style={{ width: '16px' }} />
              {renderPreviewsItems(rowItems[1])}
            </>
          ) : (
            <>
              <div style={{ width: '16px' }} />
              <div style={{ display: 'flex', flex: '1 1 100%' }} />
            </>
          )}
        </div>
      )
      previewItemsRows.push(row)
    }
    return previewItemsRows
  }

  const renderPageControls = () => {
    return (
      <div className='Pagination-controls-container'>
        <div style={{ display: 'flex' }}>
          <button className='Arrow-container' onClick={props.navigateToPrevPage}>
            <Arrow />
          </button>
          <p className='Page-index'>{`${props.currentPage}/${props.pagesCount}`}</p>
          <button className='Arrow-container' onClick={props.navigateToNextPage}>
            <Arrow className={'Arrow-right'} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='Home-container'>
      {renderPreviewsList()}
      {props.pagesCount > 1 && renderPageControls()}
    </div>
  )
}

export default HomeView
