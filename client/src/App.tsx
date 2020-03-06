import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import 'App.scss'
import Home from 'pages/Home/Home'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import ArticlesSection from 'pages/ArticlesSection/ArticlesSection'
import Contact from 'pages/Contact/Contact'
import Login from 'pages/Login/Login'
import routes from 'consts/routes'
import { isDesktopOrLaptopQuery } from 'consts/media'
import BackgroundView from 'components/Background/BackgroundView'

function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: isDesktopOrLaptopQuery,
  })

  return (
    <Router>
      {isDesktopOrLaptop && <BackgroundView />}
      <div className='App-flex-container'>
        <div className='App-container'>
          <Header />
          <Switch>
            <Route path={routes.life} component={ArticlesSection} />
            <Route path={routes.code} component={ArticlesSection} />
            <Route path={routes.guides} component={ArticlesSection} />
            <Route path={routes.projects} component={ArticlesSection} />
            <Route path={routes.contact} component={Contact} />
            <Route path={routes.login} component={Login} />
            <Route path={routes.home} component={Home} />
          </Switch>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
