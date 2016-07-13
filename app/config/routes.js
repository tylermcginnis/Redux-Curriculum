import React from 'react'
import { Router, IndexRoute, Route } from 'react-router'
import {
  MainContainer, HomeContainer, AuthenticateContainer,
  ResultsContainer } from 'containers'

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} />
        <Route path='results' component={ResultsContainer} />
        <IndexRoute component={HomeContainer} />
      </Router>
    </Router>
  )
}