import React, { Component } from 'react'
import HorizontalScroll from 'react-scroll-horizontal'

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      lightboxImage: ''
    }
  }

  onContextMenu(e) {
    e.preventDefault();
  }

  onClickTrigger(imagePath) {
    this.setState({lightboxImage: `/${imagePath}`})
  }

  closeLightbox() {
    this.setState({lightboxImage: ''})
  }

  render() {
    return (
      <div className='scrollContainer'>
        <HorizontalScroll reverseScroll={true}>
          {this.props.images.map((image, i) =>
            <div className='imageContainer' key={i}>
              <img
                className='image'
                src={`/${image.imagePath}`}
                onContextMenu={this.onContextMenu}
                onClick={() => {this.onClickTrigger(image.imagePath)}}
              />
            </div>
          )}
        </HorizontalScroll>

        {this.state.lightboxImage &&
        <div
          className='shade'
          onClick={() => {this.closeLightbox()}}
          onContextMenu={this.onContextMenu}>
          <img className='lightboxImage' src={this.state.lightboxImage} />
        </div>}

      </div>
    )
  }

}

export default Gallery
