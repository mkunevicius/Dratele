import React from 'react'
// import Lightbox from 'react-images'

class Gallery extends React.Component {

  render() {
    console.log('this.props:', this.props)
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



// {console.log('this.props:', this.props.images[i].imagePath)}

{/*<Lightbox
  images={[
    { src: '../' + this.props.images[i].imagePath }
  ]}
  isOpen={this.state.lightboxIsOpen}
  onClickPrev={this.gotoPrevious}
  onClickNext={this.gotoNext}
  onClose={this.closeLightbox}/>*/}
