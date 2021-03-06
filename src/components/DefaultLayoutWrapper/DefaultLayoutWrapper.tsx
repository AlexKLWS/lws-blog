import React from 'react'
import { useMediaQuery } from 'react-responsive'
import Loadable from 'react-loadable'

import { isDesktopOrLaptopQuery } from 'consts/media'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

type Props = {
  hideHeader?: boolean
  hideFooter?: boolean
  children?: React.ReactNode
}

const LoadableBackgroundView = Loadable({
  loader: () => import('components/Background/BackgroundView'),
  loading: () => {
    return <div />
  },
})

const DefaultLayoutWrapper: React.FC<Props> = (props: Props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: isDesktopOrLaptopQuery,
  })

  return (
    <>
      <a className='App-skip-link' href='#main'>
        Skip to main
      </a>
      {isDesktopOrLaptop && <LoadableBackgroundView />}
      <div className='App-flex-container'>
        <div className='App-container'>
          {!props.hideHeader && <Header />}
          <main id='main'>{props.children}</main>
          {!props.hideFooter && <Footer />}
        </div>
      </div>
    </>
  )
}

export default DefaultLayoutWrapper
