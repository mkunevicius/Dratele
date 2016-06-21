var React = require('react');
var PropTypes = React.PropTypes;

var About = React.createClass({

  render: function() {
    return (
      <div>
        <h1>This is {this.props.route.header}</h1>
      <p>Some about text goes here</p>
      </div>
    );
  }

});

module.exports = About;
