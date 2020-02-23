import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import 'App.scss'
import Home from 'pages/Home/Home'
import Header from 'components/Header/Header'
import ArticlesSection from 'pages/ArticlesSection/ArticlesSection'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path='/life' component={ArticlesSection} />
          <Route path='/code' component={ArticlesSection} />
          <Route path='/guides' component={ArticlesSection} />
          <Route path='/projects' component={ArticlesSection} />
          <Route path='/' component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
