import React, {Component} from 'react'
import Lightbox from 'react-images'

class Gallery extends Component {
  render() {
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
}

export default Gallery
