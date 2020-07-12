import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import 'App.scss'
import Home from 'pages/Home'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import ArticlesSection from 'pages/Article'
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
            <Switch>
              <Route exact path={routes.home}>
                <Header />
                <Home />
                <Footer />
              </Route>
              <Route path={routes.lifeArticle}>
                <Header />
                <ArticlesSection />
                <Footer />
              </Route>
              <Route path={routes.life}>
                <Header />
                <Home />
                <Footer />
              </Route>
              <Route path={routes.codeArticle}>
                <Header />
                <ArticlesSection />
                <Footer />
              </Route>
              <Route path={routes.code}>
                <Header />
                <Home />
                <Footer />
              </Route>
              <Route path={routes.guidesArticle}>
                <Header />
                <ArticlesSection />
                <Footer />
              </Route>
              <Route path={routes.guides}>
                <Header />
                <Home />
                <Footer />
              </Route>
              <Route path={routes.projectsArticle}>
                <Header />
                <ArticlesSection />
                <Footer />
              </Route>
              <Route path={routes.projects}>
                <Header />
                <Home />
                <Footer />
              </Route>
              <Route path={routes.contact}>
                <Header />
                <Contact />
                <Footer />
              </Route>
              <Route path={routes.login} component={Login} />
              <Route path={routes.secret.pageEditorExistingMaterial} component={PageEditor} />
              <Route path={routes.secret.pageEditor} component={PageEditor} />
              <Route path={routes.secret.fileUpload} component={FileUpload} />
              <Route path={routes.secret.editorMaterial} component={Editor} />
              <Route path={routes.secret.editor} component={Editor} />
              <Route path={routes.secret.home} component={SecretHome} />
              <Route path={routes.miscArticle} component={ArticlesSection} />
            </Switch>
          </div>
        </div>
      </Router>
    </ServiceProvider>
  )
}

export default App
