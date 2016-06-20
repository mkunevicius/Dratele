var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;
var Main = require('../components/Main');
var Home = require('../components/Home');
var Gallery = require('../components/Gallery');
var About = require('../components/About');
var Contact = require('../components/Contact');
var Login = require('../components/Login');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='gallery' header="Gallery" component={Gallery} />
      <Route path='gallery2/:gallery' header="Gallery2" component={Gallery} />
      <Route path='gallery' header="Gallery" component={Gallery} />
      <Route path='about' header="About" component={About} />
      <Route path='contact' header="Contact" component={Contact} />
      <Route path='api' header="API" component={Login} />
    </Route>
  </Router>
);

module.exports = routes;
