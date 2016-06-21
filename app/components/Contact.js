var React = require('react');
var PropTypes = React.PropTypes;

var Contact = React.createClass({

  render: function() {
    return (
      <div>
        <h1>This is {this.props.route.header}</h1>
        <p>Some contact text and links</p>
      </div>
    );
  }

});

module.exports = Contact;
