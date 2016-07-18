import React, {Component} from 'react'
import {getFetchConfig} from '../utils/helperFunctions';

class About extends Component {
  constructor() {
    super();
    this.state = {
      about: ''
    };
  }

  componentDidMount() {
    fetch('/api/about', getFetchConfig(null, 'GET'))
    .then((response) => {
      if (!response.ok) return Promise.reject(response.statusText)
      return response.json()
    })
    .then(data => {
      this.setState({
        about: data.text
      })
    })
  }

  render() {
    return (
      <div className='about'>
        <h1>{this.props.route.header}</h1>
        <p>{this.state.about}</p>
      </div>
    )
  }

}

export default About
