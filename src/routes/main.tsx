import React from 'react'
import { Helmet } from 'react-helmet'
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
        <Helmet>
          <title>LWS - Home</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <Home />
        </DefaultLayoutWrapper>
      </Route>
      <Route exact path={routes.life}>
        <Helmet>
          <title>LWS - Life</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <Home />
        </DefaultLayoutWrapper>
      </Route>
      <Route exact path={routes.code}>
        <Helmet>
          <title>LWS - Code</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <Home />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.guidesArticle}>
        <Helmet>
          <title>LWS</title>
        </Helmet>
        <Guide />
      </Route>
      <Route exact path={routes.guides}>
        <Helmet>
          <title>LWS - Guides</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <Home />
        </DefaultLayoutWrapper>
      </Route>
      <Route exact path={routes.projects}>
        <Helmet>
          <title>LWS - Projects</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <Home />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.contact}>
        <Helmet>
          <title>LWS - Contact</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
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
        <Helmet>
          <title>LWS</title>
        </Helmet>
        <DefaultLayoutWrapper>
          <ArticlesSection />
        </DefaultLayoutWrapper>
      </Route>
      <Route path={routes.secret.home}>{isLoggedIn ? <SecretRouter /> : <Redirect to={routes.home} />}</Route>
      <Route>
        <Helmet>
          <title>LWS</title>
          <meta name='description' content='Personal blog by Alex Korzh' />
        </Helmet>
        <DefaultLayoutWrapper>
          <EmptyPageController />
        </DefaultLayoutWrapper>
      </Route>
    </Switch>
  )
}

export default MainRouter
