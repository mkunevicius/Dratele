import React, { Component } from 'react'
import '../../main.css'
import { getProtectedFetchConfig } from '../../utils/helperFunctions'
import update from 'react-addons-update'

export default class AdminAbout extends Component {
  constructor() {
    super();
    this.state = {
      about: ''
    };
  }

  // get about from server
  componentDidMount() {
    fetch('/api/admin/about', getProtectedFetchConfig(null, 'GET'))
    .then((response) => {
      if (!response.ok) return Promise.reject(response.statusText)
      return response.json()
    })
    .then(data => {
      this.setState({
        about: data.about.text
      })
    })
  }

  render() {

    return (
      <div className='adminAbout'>
        <h2>ABOUT:</h2>
          <textarea
            className='field'
            value={this.state.about}
            onChange={(e) => {this.handleAboutChange(e.target.value)}}>
          </textarea>
        <div
          className='buttonAdd'
          onClick={() => {this.onUpdateAbout()}}
          >Update Text
        </div>
      </div>
    )
  }

  // 'About' input change handler
  handleAboutChange(value) {
    this.setState({about: value})
  }

  // Update 'About' text
  onUpdateAbout() {
    fetch('/api/admin/about', getProtectedFetchConfig({about:this.state.about}, 'PUT'))
    .then((response) => {
      if (!response.ok) return Promise.reject(response.statusText)
      return response.json()
    })
    .then(text => {
      this.setState(
        Object.assign({}, this.state, {
          categories: update(this.state.about, {$set: text})
        })
      )
    })
    .catch(err => console.log('Serv: ', err))
  }

} // end class AdminAbout Component
