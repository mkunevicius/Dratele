import React from 'react'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import Main from '../components/Main'
import Home from '../components/Home'
import galleryContainer from '../containers/galleryContainer'
import About from'../components/About'
import Contact from '../components/Contact'
import Login from '../components/Login'

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='gallery/:name' header="Gallery Container" component={galleryContainer} />
      <Route path='about' header="About" component={About} />
      <Route path='contact' header="Contact" component={Contact} />
    <Route path='login' header="Login" component={Login} />
    </Route>
  </Router>
);

export default routes
