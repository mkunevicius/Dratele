var React = require('react');
var ReactRouter = require('react-router');
// var Link = ReactRouter.Link;
// var MainContainer = require('./MainContainer');

var Home = React.createClass({
  render: function() {
    return (
      <div className='main-container'>
        <h1>This is Home</h1>
      </div>
    )
  }
});

module.exports = Home;
