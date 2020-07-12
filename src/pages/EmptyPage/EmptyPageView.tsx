import React from 'react'

import './EmptyPage.scss'

const EmptyPageView: React.FC = () => {
  return (
    <div className={'EmptyPage-container'}>
      <h1 className={'ArticleTitle'}>{`Sorry!`}</h1>
      <h3 className={'ArticleSubtitle'}>{`It looks like the page you're looking for doesn't exist!`}</h3>
    </div>
  )
}

export default EmptyPageView
