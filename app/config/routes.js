import React from 'react'
import { Router, IndexRoute, Route } from 'react-router'
import { MainContainer, HomeContainer, AuthenticateContainer } from 'containers'

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth} />
        <IndexRoute component={HomeContainer} />
      </Router>
    </Router>
  )
}