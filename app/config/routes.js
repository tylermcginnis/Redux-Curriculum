import React from 'react'
import { Router, IndexRoute, Route } from 'react-router'
import {
  MainContainer, HomeContainer, AuthenticateContainer,
  ResultsContainer, DecideContainer } from 'containers'

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth}/>
        <Route path='results' component={ResultsContainer} onEnter={checkAuth}/>
        <Route path='decide/:decisionId' component={DecideContainer} onEnter={checkAuth} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth}/>
      </Router>
    </Router>
  )
}