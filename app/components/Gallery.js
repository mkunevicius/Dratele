import React, { Component } from 'react'
import HorizontalScroll from 'react-scroll-horizontal'
// import { Popupbox, PopupboxTrigger, PopupboxModal} from 'react-popupbox/dist/react-popupbox';

class Gallery extends Component {

  onContextMenu(e) {
    e.preventDefault();
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
                //onClick={() => {this.onClickTrigger()}}
              />
            </div>
          )}
        </HorizontalScroll>
      </div>
    )
  }

  // onClickTrigger() {
  //   console.log(this.refs.popupbox)
  //   this.refs.popupbox.openPopupbox();
  // }

}

export default Gallery
