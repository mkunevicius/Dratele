import React, {Component, PropTypes} from 'react'
import {getFetchConfig} from '../utils/helperFunctions'
import ReactRouter, {Link} from 'react-router'

class Home extends Component {

  constructor() {
    super()
    this.state = {
      categories:[],
    }
  }

  componentDidMount() {

    fetch('/api/categories', getFetchConfig(null, 'GET'))
      .then((response) => {
        if (!response.ok) return Promise.reject(response.statusText)
        return response.json()
      })
      .then(data => {
        this.setState({
          categories: data,
        })
      })
  }

  render() {
    return (
      <div className='main-container'>
        <h1>This is Home</h1>
        <div className='galleries'>
          {this.state.categories.map(cat =>
            <Link to={`/gallery/${cat.name}`}>
              <div type='button'>{cat.name}</div>
            </Link>
          )}
        </div>
      </div>
    )
  }

}

export default Home
