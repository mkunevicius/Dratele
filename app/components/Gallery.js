import React, { Component } from 'react'
import HorizontalScroll from 'react-scroll-horizontal'

class Gallery extends Component {
  render() {
    const child = { width: `300em`, height: `100%` }
    return (
      <div>
        <HorizontalScroll>
          {this.props.images.map((image, i) =>
            <div style={child} className='imageContainer' key={i}>
              <img className='image' src={`/${image.imagePath}`} />
            </div>
          )}
        </HorizontalScroll>
      </div>
    )
  }
}

export default Gallery
