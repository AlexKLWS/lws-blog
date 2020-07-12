import React from 'react'
import { useMediaQuery } from 'react-responsive'

import { isDesktopOrLaptopQuery } from 'consts/media'
import BackgroundView from 'components/Background/BackgroundView'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

type Props = {
  hideHeader?: boolean
  hideFooter?: boolean
  children?: React.ReactNode
}

const DefaultLayoutWrapper: React.FC<Props> = (props: Props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: isDesktopOrLaptopQuery,
  })

  return (
    <>
      {isDesktopOrLaptop && <BackgroundView />}
      <div className='App-flex-container'>
        <div className='App-container'>
          {!props.hideHeader && <Header />}
          {props.children}
          {!props.hideFooter && <Footer />}
        </div>
      </div>
    </>
  )
}

export default DefaultLayoutWrapper
