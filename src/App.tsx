import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'App.scss'
import Home from 'pages/Home'
import ArticlesSection from 'pages/Article'
import Contact from 'pages/Contact/Contact'
import Login from 'pages/Login'
import Guide from 'pages/Guide'
import FileUpload from 'pages/Secret/FileUpload'
import PageEditor from 'pages/Secret/PageEditor'
import Editor from 'pages/Secret/Editor'
import EmptyPageController from 'pages/EmptyPage'
import SecretHome from 'pages/Secret/Home'
import routes from 'consts/routes'
import { container } from 'services/container'
import { ServiceProvider } from 'services/provider'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'
import GuideEditor from 'pages/Secret/GuideEditor'

function App() {
  return (
    <ServiceProvider container={container}>
      <Router>
        <Switch>
          <Route exact path={routes.home}>
            <DefaultLayoutWrapper>
              <Home />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.lifeArticle}>
            <DefaultLayoutWrapper>
              <ArticlesSection />
            </DefaultLayoutWrapper>
          </Route>
          <Route exact path={routes.life}>
            <DefaultLayoutWrapper>
              <Home />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.codeArticle}>
            <DefaultLayoutWrapper>
              <ArticlesSection />
            </DefaultLayoutWrapper>
          </Route>
          <Route exact path={routes.code}>
            <DefaultLayoutWrapper>
              <Home />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.guidesArticle}>
            <Guide />
          </Route>
          <Route exact path={routes.guides}>
            <DefaultLayoutWrapper>
              <Home />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.projectsArticle}>
            <DefaultLayoutWrapper>
              <ArticlesSection />
            </DefaultLayoutWrapper>
          </Route>
          <Route exact path={routes.projects}>
            <DefaultLayoutWrapper>
              <Home />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.contact}>
            <DefaultLayoutWrapper>
              <Contact />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.login}>
            <DefaultLayoutWrapper hideFooter hideHeader>
              <Login />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.secret.pageEditorExistingMaterial}>
            <DefaultLayoutWrapper>
              <PageEditor />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.secret.pageEditor}>
            <DefaultLayoutWrapper>
              <PageEditor />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.secret.guideEditorExistingMaterial}>
            <DefaultLayoutWrapper>
              <GuideEditor />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.secret.guideEditor}>
            <DefaultLayoutWrapper>
              <GuideEditor />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.secret.fileUpload}>
            <DefaultLayoutWrapper>
              <FileUpload />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.secret.editorMaterial}>
            <DefaultLayoutWrapper>
              <Editor />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.secret.editor}>
            <DefaultLayoutWrapper>
              <Editor />
            </DefaultLayoutWrapper>
          </Route>
          <Route exact path={routes.secret.home}>
            <DefaultLayoutWrapper>
              <SecretHome />
            </DefaultLayoutWrapper>
          </Route>
          <Route path={routes.miscArticle}>
            <DefaultLayoutWrapper>
              <ArticlesSection />
            </DefaultLayoutWrapper>
          </Route>
          <Route>
            <DefaultLayoutWrapper>
              <EmptyPageController />
            </DefaultLayoutWrapper>
          </Route>
        </Switch>
      </Router>
    </ServiceProvider>
  )
}

export default App
