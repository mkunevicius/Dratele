var React = require('react');
var Lightbox = require('react-images');

var Gallery = React.createClass({
  render: function() {
    return (
      <Lightbox
        images={[
          { src: '../img/01.jpg' },
          { src: '../img/02.jpg' },
          { src: '../img/03.jpg' }
        ]}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
    )
  }
});

module.exports = Gallery;
