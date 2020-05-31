import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import 'App.scss'
import Home from 'pages/Home'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import ArticlesSection from 'pages/ArticlesSection/ArticlesSection'
import Contact from 'pages/Contact/Contact'
import Login from 'pages/Login'
import FileUpload from 'pages/Secret/FileUpload'
import PageEditor from 'pages/Secret/PageEditor'
import Editor from 'pages/Secret/Editor'
import SecretHome from 'pages/Secret/Home'
import routes from 'consts/routes'
import { isDesktopOrLaptopQuery } from 'consts/media'
import BackgroundView from 'components/Background/BackgroundView'
import { container } from 'services/container'
import { ServiceProvider } from 'services/provider'
import { Category } from 'types/materials'

function App() {
  const isDesktopOrLaptop = useMediaQuery({
    query: isDesktopOrLaptopQuery,
  })

  return (
    <ServiceProvider container={container}>
      <Router>
        {isDesktopOrLaptop && <BackgroundView />}
        <div className='App-flex-container'>
          <div className='App-container'>
            <Header />
            <Switch>
              <Route path={routes.life} component={Home} />
              <Route path={routes.code} component={Home} />
              <Route path={routes.guides} component={Home} />
              <Route path={routes.projects} component={Home} />
              <Route path={routes.contact} component={Contact} />
              <Route path={routes.login} component={Login} />
              <Route path={routes.secret.addPage} component={PageEditor} />
              <Route path={routes.secret.fileUpload} component={FileUpload} />
              <Route path={routes.secret.editor} component={Editor} />
              <Route path={routes.secret.home} component={SecretHome} />
              <Route path={routes.home} component={Home} />
            </Switch>
            <Footer />
          </div>
        </div>
      </Router>
    </ServiceProvider>
  )
}

export default App
