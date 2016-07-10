import React from 'react'
import { Router, IndexRoute, Route, hashHistory } from 'react-router'
import { MainContainer, HomeContainer } from 'containers'

const routes = (
  <Router history={hashHistory}>
    <Router path='/' component={MainContainer}>
      <IndexRoute component={HomeContainer} />
    </Router>
  </Router>
)

export default routes