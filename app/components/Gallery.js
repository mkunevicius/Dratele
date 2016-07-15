import React, { Component } from 'react'
import HorizontalScroll from 'react-scroll-horizontal'

class Gallery extends Component {
  render() {
    return (
      <div className='scroll'>
        <HorizontalScroll
          reverseScroll={true}
          >
          {this.props.images.map((image, i) =>
            <div className='imageContainer' key={i}>
              <img className='image' src={`/${image.imagePath}`} />
            </div>
          )}
        </HorizontalScroll>
      </div>
    )
  }
}

export default Gallery
