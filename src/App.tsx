import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import 'App.scss'
import { container } from 'services/container'
import { ServiceProvider } from 'services/provider'
import MainRouter from 'routes/main'

function App() {
  return (
    <ServiceProvider container={container}>
      <Router>
        <MainRouter />
      </Router>
    </ServiceProvider>
  )
}

export default App
