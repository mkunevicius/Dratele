import React, { Component } from 'react'
import HorizontalScroll from 'react-scroll-horizontal'

class Gallery extends Component {
  render() {
    const visible = { overflow: `visible`, margin: `0 20vw 0 0` }
    return (
      <div>
        <HorizontalScroll
          //reverseScroll={true}
          style={visible}
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
