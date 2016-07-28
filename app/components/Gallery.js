import React, { Component } from 'react'
import HorizontalScroll from 'react-scroll-horizontal'

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      lightboxImage: ''
    }
  }

  onContextMenu(e) {
    e.preventDefault();
  }

  onClickTrigger(imagePath) {
    this.setState({lightboxImage: `/${imagePath}`})
  }

  closeLightbox() {
    this.setState({lightboxImage: ''})
  }

  render() {
    return (
      <div className='scrollContainer'>
        <HorizontalScroll reverseScroll={true}>
          {this.props.images.map((image, i) =>
            <div className='imageContainer' key={i}>
              <img
                className='image'
                src={`/${image.imagePath}`}
                onContextMenu={this.onContextMenu}
                onClick={() => {this.onClickTrigger(image.imagePath)}}
              />
            </div>
          )}
        </HorizontalScroll>

        {this.state.lightboxImage &&
        <div className='shade' onClick={() => {this.closeLightbox()}}>
          <img className='lightboxImage' src={this.state.lightboxImage} />
        </div>}

      </div>
    )
  }

}

export default Gallery






// {this.state.lightboxIsOpen && images[this.state.currentImage] &&
//
//                     <div className="lightbox">
//
//                         <div className="arrow close" onClick = {this.closeLightbox}>✕</div>
//                         <div className="arrow arrowRight" onClick = {this.gotoPrevious}>➔</div>
//                         <div className="lightboxImage">
//                             <img className="image" src={images[this.state.currentImage].src}/>
//                         </div>
//                         <div className="arrow arrowLeft" onClick = {this.gotoNext}>➔</div>
//                         <div className="shade" onClick = {this.closeLightbox}></div>
//                     </div>
//
//                 }
