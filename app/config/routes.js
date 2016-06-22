var React = require('react');
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
// var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var Route = ReactRouter.Route;
// var IndexRoute = ReactRouter.IndexRoute;
// var hashHistory = ReactRouter.hashHistory;
var Main = require('../components/Main');
import Home from '../components/Home';
import galleryContainer from '../containers/galleryContainer';
var About = require('../components/About');
var Contact = require('../components/Contact');
var Login = require('../components/Login');

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

module.exports = routes;
