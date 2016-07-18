import React, { Component } from 'react'
import HorizontalScroll from 'react-scroll-horizontal'

class Gallery extends Component {

  contextMenu(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className='scrollContainer'>
        <HorizontalScroll
          reverseScroll={true}
          >
          {this.props.images.map((image, i) =>
            <div className='imageContainer' key={i}>
              <img
                className='image'
                src={`/${image.imagePath}`}
                onContextMenu={this.contextMenu}
                />
            </div>
          )}
        </HorizontalScroll>
      </div>
    )
  }
}

export default Gallery
