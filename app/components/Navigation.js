var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Navigation = React.createClass({

  render: function() {
    return (
      <div className='navigation'>
        This is Navigation:
        <Link to='/'>
          <div type='button'>Home</div>
        </Link>
        <Link to='/about'>
          <div type='button'>About</div>
        </Link>
        <Link to='/contact'>
          <div type='button'>Contact</div>
        </Link>
      </div>
    );
  }

});

module.exports = Navigation;
