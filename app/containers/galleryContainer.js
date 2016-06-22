import React, {Component, PropTypes} from 'react';
import {getFetchConfig} from '../utils/helperFunctions'

var Gallery = require('../components/Gallery');

export default class galleryContainer extends Component {

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
        This is {this.props.route.header}
        <div>
          <Gallery images={filteredImages} />
        </div>
      </div>
    );
  }

}
