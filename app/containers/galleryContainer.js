import React, { Component, PropTypes } from 'react'
import { getFetchConfig } from '../utils/helperFunctions'
import Gallery from '../components/Gallery'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { ShareButtons, generateShareIcon } from 'react-share';

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

    // const {
    //   FacebookShareButton,
    //   TwitterShareButton
    // } = ShareButtons;
    //
    // const FacebookIcon = generateShareIcon('facebook');
    // const TwitterIcon = generateShareIcon('twitter');

    // Return gallery
    return (
      <ReactCSSTransitionGroup
        transitionName="appear"
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}>
        {filteredImages.length !== 0 &&
        <Gallery images={filteredImages} />}
      </ReactCSSTransitionGroup>

      // {/*<FacebookShareButton
      //   url={window.location.pathname}
      //   title={window.location.pathname}
      //   className="facebookButton">
      //   <FacebookIcon size={25} />
      // </FacebookShareButton>
      //
      // <TwitterShareButton
      //   url={window.location.pathname}
      //   title={window.location.pathname}
      //   className="twitterButton">
      //   <TwitterIcon size={25} />
      // </TwitterShareButton>*/}

    );
  }

}

export default galleryContainer
