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
import SecretRouter from './secret'
import { useTokenProvider } from 'facades/sessionFacade'

const TOKEN_UPDATE_CALLBACK_KEY = 'main_router'

const MainRouter = () => {
  const { isLoggedIn } = useTokenProvider(TOKEN_UPDATE_CALLBACK_KEY)

  return (
    <Switch>
      <Route exact path={routes.home}>
        <DefaultLayoutWrapper>
          <Home />
        </DefaultLayoutWrapper>
      </Route>
      <Route exact path={routes.life}>
        <DefaultLayoutWrapper>
          <Home />
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
      <Route path={routes.miscArticle}>
        <DefaultLayoutWrapper>
          <ArticlesSection />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.home}>{isLoggedIn ? <SecretRouter /> : <Redirect to={routes.home} />}</Route>
      <Route>
        <DefaultLayoutWrapper>
          <EmptyPageController />
        </DefaultLayoutWrapper>
      </Route>
    </Switch>
  )
}

export default MainRouter
