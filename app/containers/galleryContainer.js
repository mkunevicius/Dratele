import React, {Component, PropTypes} from 'react'
import {getFetchConfig} from '../utils/helperFunctions'
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

    return (
      <div>
        <h1>{catName}</h1>
        <div>
          <Gallery images={filteredImages} />
        </div>
      </div>
    );
  }

}

export default galleryContainer
