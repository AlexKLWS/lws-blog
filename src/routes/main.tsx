import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from 'pages/Home'
import ArticlesSection from 'pages/Article'
import Contact from 'pages/Contact/Contact'
import Login from 'pages/Login'
import Guide from 'pages/Guide'
import EmptyPageController from 'pages/EmptyPage'
import routes from 'consts/routes'
import DefaultLayoutWrapper from 'components/DefaultLayoutWrapper/DefaultLayoutWrapper'
import { getCookie } from 'helpers/cookies'
import SecretRouter from './secret'

const MainRouter = () => {
  const isLoggedIn = !!getCookie('token')
  return (
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
      <Route path={routes.secret.home}>{isLoggedIn ? <SecretRouter /> : <Redirect to={routes.home} />}</Route>
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
  )
}

export default MainRouter
