var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
// var MainContainer = require('./MainContainer');

var Home = React.createClass({
  render: function() {
    return (
      <div className='main-container'>
        <h1>This is Home</h1>
        <div className='galleries'>
          <Link to='/gallery'>
            <div type='button'>Gallery1</div>
          </Link>
          <Link to='/gallery2'>
            <div type='button'>Gallery2</div>
          </Link>
          <Link to='/gallery3'>
            <div type='button'>Gallery3</div>
          </Link>
          <Link to='/gallery4'>
            <div type='button'>Gallery4</div>
          </Link>
          <Link to='/gallery5'>
            <div type='button'>Gallery5</div>
          </Link>
          <Link to='/gallery6'>
            <div type='button'>Gallery6</div>
          </Link>
        </div>
      </div>
    )
  }
});

module.exports = Home;
