var React = require('react');
var PropTypes = React.PropTypes;
var Gallery = require('../components/Gallery');

var galleryContainer = React.createClass({

  render: function() {
    return (
      <div>
        This is {this.props.route.header}
        <div>
          <Gallery />
        </div>
      </div>
    );
  }

});

module.exports = galleryContainer;
