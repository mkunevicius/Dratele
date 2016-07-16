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
          images: images,
        })
      })

  }

  render() {
    let catName = this.props.params.name
    let filteredImages = this.state.images.filter(image =>
      image.name === catName
    )
    // While Loading...
    if (!this.state.images) {
      return <div className='loading'>Loading...</div>
    }
    // Return gallery
    return (
      <div>
        <Gallery images={filteredImages} />
      </div>
    );
  }

}

export default galleryContainer
