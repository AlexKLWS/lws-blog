import React from 'react'

import BackgroundProcessingView from './BackgroundProcessingView'
import './BackgroundView.scss'

const BackgroundView: React.FC = () => {
  return (
    <div className='App-background'>
      <BackgroundProcessingView />
    </div>
  )
}

export default BackgroundView
