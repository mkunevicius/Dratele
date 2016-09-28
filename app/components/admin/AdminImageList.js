import React, { Component } from 'react'
import '../../main.css'
import { getProtectedFetchConfig, imageProtectedFetchConfig } from '../../utils/helperFunctions'
import update from 'react-addons-update'
import Dropzone from 'react-dropzone'


export default class AdminImageList extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      files: []
    };
  }

  // get all data from server
  componentDidMount() {
    fetch(`/api/admin/images/${this.props.categoryId}`, getProtectedFetchConfig(null, 'GET'))
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

  onDrop(files) {
    console.log('Received files: ', files);

    this.setState({
      files: files
    });

    let fileData = new FormData
    files.forEach((file)=> {
      if (file !== undefined) fileData.append('files', file)
    })
    fileData.append('categoryId', this.props.categoryId)
    
    fetch(`/api/admin/images/upload`, imageProtectedFetchConfig(fileData, 'POST'))
        .then((response) => {
          if (!response.ok) return Promise.reject(response.statusText)
          return response.json()
        })
        .then(data => {
          console.log(data)
        })
    
  }

  render() {
    return (
      <div>
        <div className='thumbContainer'>
          <div className='addNewPhoto'>
            <Dropzone onDrop={this.onDrop.bind(this)} className="addNewPhotoBlock">
              <div>Drop files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
        </div>
        {this.state.images.map((img, j) =>
          <div className='thumbContainer' key={j}>
            <img className='thumb' src={`/${img.imagePath}`} />
            <div className='thumb-overlay'>
              <span>{img.title}</span>
              <div className='buttonAdd' onClick={() => {this.deleteImage(img.id)}}>
                Delete
              </div>
            </div>
          </div>
        )}
        {this.state.files.map((file, i) =>
            <img className='thumb' src={file.preview} key={i} />
        )}

      </div>
    )
  }

  // Delete image
  deleteImage(id) {
    if (confirm('Ramune, do you really want to delete this image?')) {
      fetch(`/api/admin/images/delete/${id}`, getProtectedFetchConfig(null, 'GET'))
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
