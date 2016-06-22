var React = require('react');
var GallryOpen = require('../components/GalleryOpen');

var Gallery = React.createClass({
  render: function() {

    console.log('this.props', this.props)

    return (
      <div>
        This is Gallery:

        {this.props.images.map((image, i) =>
          <div key={i}><img src={`/${image.imagePath}`} />{image.imagePath}</div>
        )}

      </div>
    )
  }
});

module.exports = Gallery;
