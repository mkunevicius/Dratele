import React, { Component } from 'react'
import '../../main.css'
import { getFetchConfig } from '../../utils/helperFunctions'
import update from 'react-addons-update'

export default class AdminImageList extends Component {
  constructor() {
    super();
    this.state = {
      images: []
    };
  }

  // get all data from server
  componentDidMount() {
    fetch(`/api/admin/images/${this.props.categoryId}`, getFetchConfig(null, 'GET'))
    .then((response) => {
      if (!response.ok) return Promise.reject(response.statusText)
      return response.json()
    })
    .then(data => {
      this.setState({
        images: data.images
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <div className='thumbContainer'>
          <div className='addNewPhoto'>+ Add new photo</div>
        </div>
        {this.state.images.map((img, j) =>
          <div  className='thumbContainer' key={j}>
            <img className='thumb' src={`/${img.imagePath}`} />
            <div className='thumb-overlay'>
              <span>{img.title}</span>
              <div className='buttonAddNew' onClick={() => {this.deleteImage(img.id)}}>
                Delete
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Delete image
  deleteImage(id) {
    if (confirm('Ramune, do you really want to delete this image?')) {
      fetch(`/api/admin/images/delete/${id}`, getFetchConfig(null, 'GET'))
      .then((response) => {
        if (!response.ok) return Promise.reject(response.statusText)
        return response.json()
      })
      .then(res => {
        let index = this.state.images.findIndex(el => el.id === id)
        this.setState(
          Object.assign({}, this.state, {
            images: update(this.state.images, {$splice: [[index, 1]]})
          })
        )
      })
      .catch(err => console.log('Serv: ', err))
    }
  }

} // end class AdminImageList Component
