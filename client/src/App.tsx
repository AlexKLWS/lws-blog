import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'App.scss'
import Home from 'pages/Home/Home'
import Header from 'components/Header/Header'
import ArticlesSection from 'pages/ArticlesSection/ArticlesSection'
import Contact from 'pages/Contact/Contact'
import routes from 'consts/routes'

function App() {
  return (
    <Router>
      <div className='App-background' />
      <div className='App-flex-container'>
        <div className='App-container'>
          <Header />
          <Switch>
            <Route path={routes.life} component={ArticlesSection} />
            <Route path={routes.code} component={ArticlesSection} />
            <Route path={routes.guides} component={ArticlesSection} />
            <Route path={routes.projects} component={ArticlesSection} />
            <Route path={routes.contact} component={Contact} />
            <Route path={routes.home} component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
