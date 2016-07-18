import React, { Component, PropTypes } from 'react'
import { getFetchConfig } from '../utils/helperFunctions'
import Gallery from '../components/Gallery'


class galleryContainer extends React.Component {

  constructor() {
    super()
    this.state = {
      images:[]
    }
  }

  componentDidMount() {

    fetch('/api/images', getFetchConfig(null, 'GET'))
      .then((response) => {
        if (!response.ok) return Promise.reject(response.statusText)
        return response.json()
      })
      .then(images => {
        this.setState({
          images: images
        })
      })
      .catch(err => console.log('Serv: ', err))

  }

  render() {
    let catName = this.props.params.name
    let filteredImages = this.state.images.filter(image =>
      image.name === catName
    )

    //While Loading...
    // if (this.state.images.length === 0) {
    //   return <div className='loading'>Loading...</div>
    // }

    // Return gallery
    return (
      <div>
        {filteredImages.length !== 0 &&
        <Gallery images={filteredImages} />}
      </div>
    );
  }

}

export default galleryContainer
