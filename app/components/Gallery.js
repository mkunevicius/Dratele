import React from 'react'
import GallryOpen from '../components/GalleryOpen'

class Gallery extends React.Component {

  render() {
    console.log('this.props', this.props)

    return (
      <div>
        This is Gallery:
        <div className='galleries'>
          {this.props.images.map((image, i) =>
            <div key={i}>
              <img className='image' src={`/${image.imagePath}`} />
            </div>
          )}
        </div>
      </div>
    )

  }
}

export default Gallery
